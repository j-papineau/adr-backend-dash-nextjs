'use client'
import React, {useState, useMemo, useEffect} from 'react'
import { GoogleMap, KmlLayer, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete';
import { Button, Loading, Textarea } from '@nextui-org/react';
import axios from 'axios';

import SearchBar from "./SearchBar"
import RegionsDropDown from './RegionsDropDown';
import { allZips } from "../data/zips"


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


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDC1y0pr-XmHq2UbAj8cUeDx2unB_MwCv8",
    libraries: libraries
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    //onload goes here

    
    const bounds = new window.google.maps.LatLngBounds({lat:-27,lng: 85});
    map.fitBounds(bounds);
    // map.setCenter({lat:-27, lng: 85})
    console.log("onload")

    setMap(map)
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
      temp.forEach(async element => {
        const response = await fetch(url + element)
      });

      setSelectedZips([]);
      refreshArea();
      


    }

    function clearMarkers(){

       
        if(markers.length > 1){
            markers.forEach(marker => {
                marker.setMap(null);
            });
            setMarkers(null)
        }
    }

    function refreshArea(){
      let temp = selectedRegion;
      setSelectedRegion[{zip: "33619", slug:"tampa"}];
      setSelectedRegion[temp];
    }

    


  return isLoaded ? (
    
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
                {/* <PlacesAutoComplete
                onAddressSelect={(address) => {
                    getGeocode({address: address}).then((results) => {
                    const { lat, lng} = getLatLng(results[0]);
                    setCenter({lat: lat, lng: lng})
                    setZoom(10)
                    })
                }}
                /> */}
                <p>Selected Zips</p>
                <Textarea isReadOnly aria-label="selected zips" value={selectedZips}/>
                <Button onPress={deleteSelected} className='my-4' color={"secondary"}>Delete Selected</Button>
        </div>
      

        
    </div>

  
    <div className='text-black p-4'>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={map => {
         
         const kml = new google.maps.KmlLayer({
          url: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1iXNhWbl6gWbRBomLTyX2KlnOKXxI4Yrh",
          map: map,
         })

         setMap(map);
         
          
        }}  
        
      >
        <></>
      </GoogleMap>
    </div>
    
  </div>
     
  ) : <></>
}

export default React.memo(Map)