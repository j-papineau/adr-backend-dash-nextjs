'use client'
import React, {useState, useMemo} from 'react'
import { GoogleMap, KmlLayer, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete';

import SearchBar from "./SearchBar"



const containerStyle = {
  width: '900px',
  height: '600px'
};



function Map({data}) {

    

    const libraries = useMemo(() => ['places'], []);

    // const [lat, setLat] = useState(-27)
    // const [lng, setLng] = useState(85)
    
    const [center, setCenter] = useState({lat: 27, lng: -85});
    const [zoom, setZoom] = useState(1);
    let markers = []


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
    setMap(null)
  }, [])

  async function createSearchMarkers(map){
    

    // console.log("first zip: " + data[0].zip)
    // getLatLngZip(data[0].zip).then((res) => {

    // })
    //console.log(latLng.lat + " " + latLng.lng)
    
    data.forEach(async search => {

      //  getLatLngZip(search.zip).then((res) => {

      //       var latLng = new google.maps.LatLng(res.lat, res.lng);    

      //       var marker = new google.maps.Marker({
      //           position: latLng,
      //           title: search.zip,
      //           map: map
      //       })

      //       const contentString = "<div>" +
      //       "<h1> Search: " + search.zip + "</h1>" + 
      //       "<li>Source " + search.sourceURL + "</li>"
      //       + "<li>Date " + search.date + "</li>" + 
      //       "<li>Went To " + search.slug + "</li>" + 
      //       "</div>" 

      //       var infowindow = new google.maps.InfoWindow({
      //           content: contentString,
      //           ariaLabel: "zip popup"
      //       });

      //       marker.addListener("click", () => {
      //           infowindow.open({
      //               anchor:marker,
      //               map,
      //           })
      //       })


      //  })


        
    });


  }

  async function getLatLngZip(zip){
    const url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDC1y0pr-XmHq2UbAj8cUeDx2unB_MwCv8&components=postal_code:"
    const response = await fetch(url + zip);
    const data = await response.json();

    let lat,lng;

    if(data.status === 'OK'){
        lat = data.results[0].geometry.location.lat
        lng = data.results[0].geometry.location.lng
    }else{
        lat = 0
        lng = 0
    }
    
    return {lat: lat, lng: lng}

  }

  return isLoaded ? (
    
  <div className='flex'>

  
    <div className='text-black p-4'>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        
        onLoad={async map => {

          
         
         const kml = new google.maps.KmlLayer({
          url: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1iXNhWbl6gWbRBomLTyX2KlnOKXxI4Yrh",
          map: map,
         })

         await createSearchMarkers(map);

         setMap(map);

         createSearchMarkers();
         
          
        }}  
        
      >
        <></>
      </GoogleMap>
    </div>
    <div >
      <PlacesAutoComplete
      onAddressSelect={(address) => {
        getGeocode({address: address}).then((results) => {
          const { lat, lng} = getLatLng(results[0]);

          // setLat(lat);
          // setLng(lng);
          setCenter({lat: lat, lng: lng})
          setZoom(10)

          const infowindow = new google.maps.InfoWindow({
            content: "<p>Your Search</p>"
          })
          
          const marker = new google.maps.Marker({
            position:{lat:lat, lng:lng},
            map:map,
            title:"Your Search"
          })

          infowindow.open({
            anchor:marker,
            map,
          })

        })
      }}
      />
    </div>
      


  </div>
     
  ) : <></>
}

export default React.memo(Map)