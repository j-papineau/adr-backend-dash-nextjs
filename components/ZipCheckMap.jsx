'use client'
import React, {useState, useMemo, useEffect, useRef} from 'react'
import { GoogleMap, KmlLayer, MarkerClusterer, useJsApiLoader} from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete';
import { Button, Loading, Textarea } from '@nextui-org/react';
import { allZips } from "../data/zips"
import { Alert, Switch, Button as MuiButton, Select, MenuItem, FormControl, InputLabel, TextField, Typography, Switch as MuiSwitch, FormControlLabel, Box, Modal} from '@mui/material';

import {supabase} from "../supabase/supabase"

const containerStyle = {
  width: '900px',
  height: '700px'
};

function Map() {

    const libraries = useMemo(() => ['places'], []);

    // const [lat, setLat] = useState(-27)
    // const [lng, setLng] = useState(85)
    
    const [center, setCenter] = useState({lat: 27, lng: -85});
    const [zoom, setZoom] = useState(1);
    const [selectedRegion, setSelectedRegion] = useState({zip: "9999", slug:"none"})
    const [zipsLoading, setZipsLoading] = useState(false);
    const [polygonMode, setPolygonMode] = useState(false);
    const mapReference = useRef()


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCVBWeLH2VEZ-cEuVE3ZGmtIR5TI1vqm_s",
    libraries: libraries
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    //onload goes here

    
    const bounds = new window.google.maps.LatLngBounds({lat:-27,lng: 85});
    map.fitBounds(bounds);
    // map.setCenter({lat:-27, lng: 85})
    console.log("onload")

  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

//MAP METHODS

    const [markers, setMarkers] = useState([])
    const [selectedZips, setSelectedZips] = useState([])
    const [selectedMarkers, setSelectedMarkers] = useState({})
    useEffect(() => {

      if((selectedRegion.zip !== "9999")){
        console.log("region changed: " + selectedRegion)
        //TODO: Find fix for zoom
        // zoomMapToZip(selectedRegion.zip)
        createMarkersByRegion(selectedRegion.slug)
      }

    }, [selectedRegion])

    async function zoomMapToZip(zip){
        console.log("zooming to " + zip)
        let lat, lng 
        allZips.forEach(element => {
           if(element.Zipcode == zip){
            lat = element.Lat
            lng = element.Long
           } 
        })

        map.setCenter({lat: lat, lng: lng})
        map.setZoom(8)
    }


    async function createMarkersByRegion(slug){

        setMarkers([]);
        setZipsLoading(true)

        const {data, error} = await supabase.from('zip_code_slugs').select("zip").eq('slug', slug)

        data.forEach(item => {
          allZips.forEach(element => {
            if(element.Zipcode == item.zip){
              let lat = element.Lat;
              let lng = element.Long;
              addMarker(lat, lng, (item.zip).toString())
            }
          })
        })

        setZipsLoading(false);

    }

    function addMarker(lat, lng, zip){

        const marker =  new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map,
            title: zip,
            icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        });

        marker.addListener("click", () => {
            

            if(marker.icon === 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'){
              //turn green to add
              marker.setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png')
              setSelectedZips(current => [...current, marker.title])
            }else{
              //turn red to remove
              marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png')
              let newArray = selectedZips.filter((e) => e !== marker.title)  
              setSelectedZips(newArray);
            }
            
           
            
        })

        setMarkers(current => [...current, marker])
        
    }

    async function deleteSelected(){
      let temp = selectedZips
      let count = 0;

      let errorZips = []

       temp.forEach(async zip => {
        const { error } = await supabase.from('zip-code-slugs').delete().eq('zip', zip)
        count++
      });

      setAlertSeverity("success")
      setAlertText("zips deleted from db. this may take time to reflect on the map")
      setAlertShowing(true)

      setSelectedZips([]);
      refreshArea();
      
    }

    function clearMarkers(){

       
        if(markers != null && markers.length > 1){
            markers.forEach(marker => {
                marker.setMap(null);
            });
            setMarkers(null)
        }else{
          setAlertSeverity("warning")
          setAlertText("There are no markers to clear")
          setAlertShowing(true)
        }
    }

    function refreshArea(){
      let temp = selectedRegion;
      setSelectedRegion[{zip: "33619", slug:"tampa"}];
      setSelectedRegion[temp];
    }
 
    const [polyMarkers, setPolyMarkers] = useState([])
    const mapClick = (e) => {
      if(polygonMode){
        var marker = new google.maps.Marker({
          position:e.latLng,
          map:map
        })


        setPolyMarkers(current => [...current, marker]);

      }else{
        console.log("poly mode is off")
      }
    }

  const [polygon, setPolygon] = useState();

  function drawPoly(){

    let coords = [];

    polyMarkers.forEach(marker => {
      coords.push(marker.getPosition())
    });

    let tempPoly = new google.maps.Polygon({
      paths:coords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    })

    polyMarkers.forEach(item => {
      item.setMap(null)
    });

    setPolyMarkers([])

    tempPoly.setMap(map)
    tempPoly.setEditable(true)
    setPolygon(tempPoly)



  }

  function clearPoly(){
    if(polygon != null){
      polygon.setMap(null)
      
    }else{
      setAlertSeverity("warning")
      setAlertText("There is no polygon to clear.")
      setAlertShowing(true);
    }
  }

  const [foundZips, setFoundZips] = useState([]);
  const [selectedText, setSelectedText] = useState([]);

  function getZipsPoly(){

    if(foundZips.length > 1){
      setFoundZips([])
    }
    

    
    if(polygon != null){

      let polyZips = []

    
    allZips.forEach(item => {

      let itemCoord = new google.maps.LatLng(item.Lat,item.Long)
      setSelectedText([])

      let isInside = google.maps.geometry.poly.containsLocation(
        itemCoord,
        polygon
      )

      if(isInside){
        var marker = new google.maps.Marker({
          position:itemCoord,
          map:map,
          
        })

        marker.setTitle(item.Zipcode)

        polyZips.push(item.Zipcode)
        
        
      }
      
    });
    console.log(polyZips)
    setSelectedText(polyZips)
  }else{
    setAlertText("Polygon is not drawn.")
    setAlertSeverity("warning")
    setAlertShowing(true);
  }

    

  }

  const [customKML, setCustomKML] = useState();
  const [kmlClickable, setKmlClickable] = useState(true);
  const [alertShowing, setAlertShowing] = useState(false);
  const [alertText, setAlertText] = useState("test alert");
  const [alertSeverity, setAlertSeverity] = useState("success")

  // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)

  const [uiReady, setUiReady] = useState(false)
  const [selectableRegions, setSelectableRegions] = useState([])

  useEffect(() => {
    
    const fetchSelectableRegions = async () => {
      const { data } = await supabase.from("unique_slugs").select('slug').order("slug", {ascending: true})
      setSelectableRegions(data)
    }

    fetchSelectableRegions()
    setUiReady(true)
    console.log(customKML)
  }, [])

  const addZipsToDB = () => {
    console.log("adding zips to db");
    let slug = document.getElementById("slugInput").value

    if(slug == ""){
      return;
    }

    selectedText.forEach(async zip => {
      const { error } = await supabase.from("zip_code_slugs").insert({zip: zip, slug: slug})
    });

    handleClose()
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    if(selectedText.length > 0){
      setModalOpen(true);
    }else {
      setAlertText("No Zips Selected")
      setAlertSeverity("error")
      setAlertShowing(true)
    }
  }
  const handleClose = () => setModalOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return isLoaded ? (
  
  <div>
    <div id='alertDiv' >
      {alertShowing ? (
        <Alert  severity={alertSeverity} variant='standard' onClose={() => {setAlertShowing(false)}}>{alertText}</Alert>
      ) :(<></>)}
    </div>
  <div className='flex flex-row justify-center px-auto'>
    <div className='flex flex-col items-center bg-slate-200 h-[700px] w-[30%] my-4 shadow-black drop-shadow-xl border'>
    { uiReady ? (
      <>
        <div className='flex flex-row h-[10%] w-[90%] my-4 justify-center space-x-4'>
          <FormControl className='w-[200px]'>
            <InputLabel id="demo-simple-select-label">Select Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age" 
              placeholder='NONE' 
              onChange={(e) => {setSelectedRegion({"zip":99999, "slug": e.target.value})}}
            >
              {selectableRegions.map((region, index) => (
                <MenuItem key={index} value={region.slug}>{region.slug}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className='text-black flex flex-col text-center'> 
            <Typography>Now Viewing Region:</Typography>
            <p className='uppercase font-bold'>{selectedRegion.slug}</p>
          </div>
        </div>

        <div className='flex flex-row h-[20%] w-[90%] space-x-4 items-center justify-center'>
          <TextField
            id="outlined-multiline-static"
            label="Selected Zips"
            multiline
            inputProps={{
              readOnly: true
            }}
            rows={2}
            defaultValue=" "
            value={selectedZips}
          />

          <MuiButton color='error' variant='contained' onClick={deleteSelected}>Delete Selected</MuiButton>

        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className='flex flex-col space-y-2 justify-center'>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Zips to DB
              </Typography>
              <TextField label="slug" id='slugInput'/>
              <MuiButton className='w-40' color='success' variant='contained' onClick={addZipsToDB}>Add Zips</MuiButton>
            </div>
          </Box>
        </Modal>
          
        </div>

        <div className='flex flex-col my-2 text-black items-center'>
            <Typography variant="h5" color={"BlackText"}>Polygon Tools</Typography>
            <div className='flex flex-row space-x-5 pt-4'>
              <div className='flex flex-col items-center'>
                <Typography variant="p">ADR Overlay Clickable</Typography>
                <MuiSwitch defaultChecked onChange={(e) => {
                  setKmlClickable(e.target.checked)
                  if(!e.target.checked){
                    customKML.setOptions({
                      clickable:false
                    })
                  }else{
                    customKML.setOptions({
                      clickable:true
                    })
                  }
                }} />
              </div>
              <div className='flex flex-col items-center'>
                <Typography variant="p">Polygon Mode</Typography>
                <MuiSwitch onChange={(e) => {
                  setPolygonMode(e.target.checked)
                }}/>
              </div>
            </div>
            <div className='flex flex-row space-x-2 p-1'>
                <MuiButton variant="contained" onClick={drawPoly}>Draw Polygon</MuiButton>
                <MuiButton variant="contained" color='warning' onClick={clearPoly}>Clear Polygon</MuiButton>
            </div>
            <div className='flex flex-row space-x-2 p-2 my-2'>
                <MuiButton variant="contained" onClick={getZipsPoly}>Get Zips</MuiButton>
                <MuiButton variant="contained" color='success' onClick={handleOpen}>Add Zips to DB</MuiButton>
            </div>
            <TextField
            id="outlined-multiline-static"
            className='w-[90%]'
            label="Zips in Polygon"
            multiline
            inputProps={{
              readOnly: true
            }}
            rows={8}
            defaultValue=" "
            value={selectedText}
          />  
        </div>
        <div className='flex flex-col my-2 text-black'>
            {/* <MuiButton className='h-[40px]' variant='contained' color='error' >Clear Map</MuiButton> */}
        </div>
      </>
      
    ) : (<div className='mt-10'><Loading size='xl'></Loading></div>)}
    </div>
    

  
    <div className='text-black p-4 shadow-black drop-shadow-xl'>
        <GoogleMap
        
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        ref={mapReference}
        id='googlemap'
        onClick={mapClick}
        onLoad={map => {
         const kml = new google.maps.KmlLayer({
          url: "https://ydtalmcsutkxxlyoskoq.supabase.co/storage/v1/object/public/adr-map/ADR%20Map%20(9).kml",
          map: map,
         })

         kml.addListener('status_changed', () => {
          console.log('KML Status:', kml.getStatus());
          if (kml.getStatus() !== 'OK') {
            console.error('Failed to load KML layer:', kml.url);
          }
        });
        
         setCustomKML(kml)
         setMap(map); 
         console.log(customKML)
        }}  
        
      >
        <></>
      </GoogleMap>
    </div>
    
  </div>
  

  </div>
     
  ) : <></>
}

export default React.memo(Map)