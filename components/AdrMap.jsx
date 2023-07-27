'use client'
import react, {useState} from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import PlacesAutoComplete from './PlacesAutoComplete'
import Header from './Header';
import { KmlLayer } from '@react-google-maps/api';


const ADRMap = () => {

  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDC1y0pr-XmHq2UbAj8cUeDx2unB_MwCv8",
    libraries: libraries,
  });

  const [lat, setLat] = useState(27)
  const [lng, setLng] = useState(-85)

  const mapCenter = useMemo(
    () => ({lat: lat, lng: lng}), [lat, lng]
  )

  const kmlURL = "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1iXNhWbl6gWbRBomLTyX2KlnOKXxI4Yrh"
 // const kmlURL = "https://adrstagingreal.wpengine.com/Joel-Dash/Map-Tools/MAIN/assets/ADRMap.kml"
 
  
  
 




  if (!isLoaded) {
    return <p className='text-black dark:text-white'>Loading...</p>;
  }

  return (
    
    <div className='flex text-black dark:text-white p-4 ' style={{height: '100%', width:'100%'}}>
      <div className=' w-[25%] p-2'>
        <p>Sidebar</p>
        {/* <input className='text-black'
          value={value}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          placeholder='33619'/>

          {status === 'OK' && (
            <ul>{renderSuggestions()}</ul>
          )} */}
         <PlacesAutoComplete
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);

              setLat(lat);
              setLng(lng);
            });
          }}
        />
      </div>
      <div >
        <GoogleMap
        zoom={4}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{width: '800px', height: '600px'}}
        >

        <KmlLayer 
          url='https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1iXNhWbl6gWbRBomLTyX2KlnOKXxI4Yrh'
          options={{ preserveViewport: true }}
          onLoad={console.log("loaded kml")}
        />
         


        </GoogleMap>
      </div>
      
    </div>


  )



}

export default ADRMap;