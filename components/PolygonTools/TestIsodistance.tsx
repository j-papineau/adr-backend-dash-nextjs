import React, { useCallback, useState } from 'react'
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import { CircularProgress } from '@mui/material'

type Props = {}

const containerStyle = {
    width: '400px',
    height: '400px',
}

const center = {
    lat: 40,
    lng: -74
}

const TestIsodistance = (props: Props) => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_G_KEY
    })

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map);
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, [])



  return isLoaded ? (
    <div>
        
    </div>
  ) : (<CircularProgress/>)
}

export default React.memo(TestIsodistance)