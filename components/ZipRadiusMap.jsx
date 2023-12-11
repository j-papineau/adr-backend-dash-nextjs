'use client'
import React, {useState, useMemo} from 'react'
import { GoogleMap, KmlLayer, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete';

import SearchBar from "./SearchBar"
import { Button, Input, Textarea } from '@nextui-org/react';
import { Elsie_Swash_Caps } from 'next/font/google';
import { Slider } from '@mui/material';
import { allZips } from "../data/zips"


const containerStyle = {
  width: '900px',
  height: '600px'
};



function Map() {

    const libraries = useMemo(() => ['places'], []);

    // const [lat, setLat] = useState(-27)
    // const [lng, setLng] = useState(85)
    
    const [center, setCenter] = useState({lat: 27, lng: -85});
    const [zoom, setZoom] = useState(1);


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

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    console.log("unmount called")
    setMap(null)
  }, [])


//MAP FUNCTIONS

  const [selectedAdress, setSelectedAdress] = useState(null);
  const [radius, setRadius] = useState(1);
  const [circle, setCircle] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [outputZips, setOutputZips] = useState([])

  function drawRadius(){
    if(circle != null){
        clearAll()
    }
    if(selectedAdress != null){
        //selected address is in latlng
        console.log("drawing circle")
        
        const circle = new google.maps.Circle({
            strokeColor: "#FF000",
            strokeOpacity: 0.8,
            strokeWeight:2,
            fillColor: "#FF0000",
            fillOpacity:0.35,
            map,
            center: selectedAdress,
            radius: radius * 1609.34
        })

        setCircle(circle);

        getZipsInRadius(radius * 1609.34)

    

    }else{
        console.log("no address selected")
    }
  }

  function getZipsInRadius(radiusM){

    allZips.forEach(zip => {
        
        var latlng = {lat: zip.Lat, lng: zip.Long}
        if(isInCircle(latlng, selectedAdress, radiusM / 1000) == true){
            var marker = new google.maps.Marker({
                position: latlng,
                map:map
            })

            setMarkers(current => [...current, marker])
            setOutputZips(current => [...current, zip.Zipcode])
        }
    });

  }

  function isInCircle(checkPoint, centerPoint, km){

    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  function clearAll(){

    if(circle != null){
        circle.setMap(null)
        markers.forEach(marker => {
            marker.setMap(null)
        });
        setMarkers([])
        setOutputZips([])
    }
  }

  return isLoaded ? (
    
<div className='flex'>

<div className=''>
      <PlacesAutoComplete
      onAddressSelect={(address) => {
        getGeocode({address: address}).then((results) => {
          const { lat, lng} = getLatLng(results[0]);

          setSelectedAdress({lat: lat, lng: lng});

          // setLat(lat);
          // setLng(lng);
          setCenter({lat: lat, lng: lng})
          setZoom(10)

          const infowindow = new google.maps.InfoWindow({
            content: "<p>Selected Address</p>"
          })
          
          const marker = new google.maps.Marker({
            position:{lat:lat, lng:lng},
            map:map,
            title:"Selected Address",
            icon:"https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          })

          infowindow.open({
            anchor:marker,
            map,
          })

        })
      }}
      />

      <div className='my-10 '>
        <Slider className='' aria-label="radius" value={radius} onChange={(e) => {setRadius(e.target.value)}}/>
        <p>{radius} miles</p>
        <Button className='my-4' onPress={drawRadius}>Draw Radius</Button>
        <Button className='my-4' color={"warning"} onPress={clearAll}>Clear</Button>
        <p className='pt-10'>Zips in Area</p>
        <Textarea className='my-4 h-full' maxRows={8} minRows={8} value={outputZips} isReadOnly/>
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