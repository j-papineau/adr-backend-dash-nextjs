'use client'
import React, {useState, useMemo, useEffect, useRef} from 'react'
import { GoogleMap, KmlLayer, MarkerClusterer, useJsApiLoader} from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete';
import { Button, Loading, Textarea } from '@nextui-org/react';
import axios from 'axios';

import SearchBar from "./SearchBar"
import RegionsDropDown from './RegionsDropDown';
import { allZips } from "../data/zips"
import { Alert, Switch } from '@mui/material';





const containerStyle = {
  width: '800px',
  height: '600px'
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
        zoomMapToZip(selectedRegion.zip)
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
        const response = await fetch("https://adrstagingreal.wpengine.com/Joel-Dash/php/zipsInRegion.php?region=" + slug);
        const zips = await response.json();

        zips.forEach(item => {
            allZips.forEach(element => {
                if(element.Zipcode == item.ZIP){
                    let lat = element.Lat;
                    let lng = element.Long;
                    addMarker(lat, lng, item.ZIP)
                }
            });
        });

       

        let markerCluster = new MarkerClusterer(map, markers, {
          imagePath: 'https://github.com/googlearchive/js-marker-clusterer/blob/gh-pages/images/m2.png',
          gridSize: 10,
          minimumClusterSize: 2
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
      const url = "https://adrstagingreal.wpengine.com/Joel-Dash/php/deleteZip.php?appZip="
      let count = 0;
      temp.forEach(async element => {
        const response = await fetch(url + element).then(count++)
      });

      setAlertSeverity("success")
      setAlertText(count + " zips deleted from db. this may take time to reflect on the map")
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

  

    


  return isLoaded ? (
  
  <div>
    <div id='alertDiv' >
      {alertShowing ? (
        <Alert  severity={alertSeverity} variant='standard' onClose={() => {setAlertShowing(false)}}>{alertText}</Alert>
      ) :(<></>)}
    </div>
  <div className='flex'>
      <div className='flex flex-col items-center justify-center mx-auto '>
        <p className='text-2xl'>Selected Region:</p>
        <p className='uppercase'>{selectedRegion.slug}</p>
        <div className='p-2'>
         <RegionsDropDown setSelectedRegion={setSelectedRegion}/>
         {zipsLoading ? (<Loading/>) : (
            <></>
         )}
         <Button className='my-4' color="warning" onPress={clearMarkers} >Clear Map</Button>
        </div>
        
        <div className='h-[50vh]'>
                
                <p>Selected Zips</p>

                <Textarea aria-label="selected zips" value={selectedZips}/>
                <Button onPress={deleteSelected} className='my-4' color={"secondary"}>Delete Selected</Button>
                <div className='py-4'>
                  <div>
                    <p>ADR Overlay Clickable</p>
                    <Switch color={"primary"} defaultChecked={true} onChange={(e) => {
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
                    }}/>
                  </div>

                  <p>Polygon Mode</p>
                  <Switch color={"secondary"} onChange={(e) => {
                    setPolygonMode(e.target.checked)
                    console.log(polygonMode)
                    }}/>
                  <div className='m-4'>
                    <Button color={"primary"} onPress={drawPoly}>Draw Polygon</Button>
                    <Button color={"warning"} onPress={clearPoly}>Clear Polygon</Button>
                    <Button color={"secondary"} onPress={getZipsPoly}>Get Zips</Button>
                    <Button color={"success"}>Add Zips to DB</Button>
                    <Textarea value={selectedText}/>
                  </div>
                  
                </div>
                
        </div>
      

        
    </div>

  
    <div className='text-black p-4'>
        <GoogleMap
        
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        ref={mapReference}
        id='googlemap'
        onClick={mapClick}
        onLoad={map => {

          

          
         
         const kml = new google.maps.KmlLayer({
          url: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1iXNhWbl6gWbRBomLTyX2KlnOKXxI4Yrh",
          map: map,
         })

         setCustomKML(kml)


         setMap(map);
         
          
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