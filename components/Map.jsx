import React, {useState, useMemo} from 'react'
import { GoogleMap, KmlLayer, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete';
import MapSearchBar from './MapSearchBar';


const containerStyle = {
  width: '600px',
  height: '600px'
};



function Map() {

    const libraries = useMemo(() => ['places'], []);

    const [lat, setLat] = useState(-27)
    const [lng, setLng] = useState(85)
    
    const [center, setCenter] = useState(lat, lng);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDC1y0pr-XmHq2UbAj8cUeDx2unB_MwCv8"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    //onload goes here

    const bounds = new window.google.maps.LatLngBounds({lat:-27,lng: 85});
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (

    <div className='flex text-black dark:text-white p-4'>
        <div className='w-[25%] p-2'>
           {/* <MapSearchBar setLat={setLat} setLng={setLng}/> */}
        </div>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <KmlLayer
            url='https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1iXNhWbl6gWbRBomLTyX2KlnOKXxI4Yrh'
            options={{preserveViewport: false}}
        />
        
      </GoogleMap>
    </div>
     
  ) : <></>
}

export default React.memo(Map)