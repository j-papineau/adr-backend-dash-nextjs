import React from 'react'
import JsonConverter from './JsonConverter'
import KmlUpload from './kmlUpload'

const MapStuff = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <KmlUpload/>
        <JsonConverter/>
       
    </div>
  )
}

export default MapStuff