import React, { useState } from 'react'
import { Box, Divider, TextField } from '@mui/material'
import KmlUpload from './KmlUpload'
import CustomerMap from './CustomerMap'
import InternalMap from './InternalMap'
import { MdRefresh } from 'react-icons/md'

const MapStuff = () => {

  const [internalData, setInternalData] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  const refreshMaps = () => {

  }

  return (
    <div className='flex flex-col bg-slate-200 p-10 m-4 rounded-md'>
      <div className='rounded-md m-2 p-2'>
        <KmlUpload/>
        <div className='my-4'>
          <Divider />
        </div>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-2xl font-bold'>Map Preview</p>
          <a onClick={() => {

          }}>
            <MdRefresh size={30} className='hover:text-blue-200'/>
          </a>
        </div>
        <div className='flex items-center justify-center flex-col lg:flex-row md:space-x-4'>
          <div className='flex flex-col md:w-full'>
            <p className='text-xl'>Internal</p>
            <InternalMap/>
          </div>
          <div className='flex flex-col md:w-full'>
            <p className='text-xl'>Customer Facing</p>
            <CustomerMap/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MapStuff