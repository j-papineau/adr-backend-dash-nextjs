import React from 'react'
import JsonConverter from './JsonConverter'
import KMLChange from './KMLChange'
import JsonSetter from './JsonSetter'

const MapStuff = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
        <KMLChange/>
        <JsonSetter/>
        <JsonConverter/>

       
    </div>
  )
}

export default MapStuff