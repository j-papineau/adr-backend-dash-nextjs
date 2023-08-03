'use client'
import React, {useState, useMemo} from 'react'
import { GoogleMap, KmlLayer, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete';

import SearchBar from "./SearchBar"
import RegionsDropDown from './RegionsDropDown';



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





  return isLoaded ? (
    
  <div className='flex'>

    

  
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
    <div>
        <div className='h-[25vh]'>
         <RegionsDropDown/>
        </div>
        
        <div className='h-[50vh]'>
                <PlacesAutoComplete
                onAddressSelect={(address) => {
                    getGeocode({address: address}).then((results) => {
                    const { lat, lng} = getLatLng(results[0]);
                    setCenter({lat: lat, lng: lng})
                    setZoom(10)
                    })
                }}
                />
        </div>
      

        
    </div>
      


  </div>
     
  ) : <></>
}

export default React.memo(Map)