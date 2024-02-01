import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, CircularProgress, Divider, TextField } from '@mui/material'
// import KmlUpload from './KmlUpload'
// import CustomerMap from './CustomerMap'
// import InternalMap from './InternalMap'
import { MdRefresh } from 'react-icons/md'
// import MapSettings from './MapSettings'

//


const MapStuff = () => {

  const CustomerMap = useMemo(() => dynamic(
    () => import('./CustomerMap'),
    {
      loading: () => <CircularProgress/>,
      ssr: false
    }
  ), [])
  
  const InternalMap = useMemo(() => dynamic(
    () => import('./InternalMap'),
    {
      loading: () => <CircularProgress/>,
      ssr: false
    }
  ), [])

  const KmlUpload = useMemo(() => dynamic(
    () => import('./KmlUpload'),
    {
      loading: () => <CircularProgress/>,
      ssr: false
    }
  ), [])

  const MapSettings = useMemo(() => dynamic(
    () => import('./MapSettings'),
    {
      loading: () => <CircularProgress/>,
      ssr: false
    }
  ), [])





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
          <div className='flex flex-col my-4'>
            <p className='text-2xl font-bold'>Map Preview</p>
            <p>Marker icons omitted for load speed</p>
          </div>
          {/* <a onClick={() => {

          }}>
            <MdRefresh size={30} className='hover:text-blue-200'/>
          </a> */}
        </div>
        <div className='flex items-center justify-center flex-col lg:flex-row md:space-x-4 h-[400px]'>
          <div className='flex flex-col md:w-full'>
            <p className='text-xl'>Internal</p>
            <InternalMap/>
          </div>
          <div className='flex flex-col md:w-full'>
            <p className='text-xl'>Customer Facing</p>
            <CustomerMap/>
          </div>
        </div>
        <div className='my-8'>
          <Divider />
        </div>
        <div>
          <MapSettings/>
        </div>
      </div>
    </div>

  )
}

export default MapStuff