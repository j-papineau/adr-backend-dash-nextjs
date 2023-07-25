import React, { useMemo } from 'react'
import { useLoadScript, GoogleMap, KmlLayer } from '@react-google-maps/api'
import { Loading } from '@nextui-org/react'

const AdrMap = () => {

  const libraries = useMemo(() => ['places'],[])

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyD1gQOeZR8idLOw-CtAOSN7_2tVlKW6XKI",
    libraries: libraries,
  })

  const mapCenter = useMemo(
    () => ({lat:29, lng:-81})
  )

  function generateRandom() {
    return Math.random() * 10000000000000000
  }

  // const mapOptions = useMemo<google.maps.MapOptions>(
  //   () => ({
  //     disableDefaultUI: true,
  //     clickableIcons: true,
  //     scrollwheel: false,
  //   }),
  //   []
  // );

  if(!isLoaded){
    return <Loading/>
  }

  return(


    <div className='text-black'>
      <GoogleMap
        options={{
          clickableIcons:true
        }}
        zoom={5}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '800px', height: '800px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >

        <KmlLayer
          url=
          {"https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1iXNhWbl6gWbRBomLTyX2KlnOKXxI4Yrh" 
        + '&ver=' + generateRandom()}
          options={{preserveViewport : false}}
          />

        </GoogleMap>
    </div>
  )
    
   
}

export default AdrMap

