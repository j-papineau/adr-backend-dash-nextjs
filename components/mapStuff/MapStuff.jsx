import React from 'react'
import JsonConverter from './JsonConverter'
import KmlUpload from './kmlUpload'
import KMLChange from './KMLChange'

const MapStuff = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <KMLChange/>
        <JsonConverter/>
       
    </div>
  )
}

export default MapStuff