import React from 'react'
import { Box, Divider, TextField } from '@mui/material'
import KmlUpload from './KmlUpload'

const MapStuff = () => {
  return (
    <div className='flex flex-col bg-slate-100 h-screen p-10'>
      <div className='rounded-md m-2 p-2'>
        <KmlUpload/>
        <div className='my-4'>
          <Divider />
        </div>
        <p className='text-2xl font-bold'>Map Preview</p>
        <div className='flex flex-row'>
          <div className='flex flex-col w-[50%]'>
            <p className='text-xl'>Internal</p>
          </div>
          <div className='flex flex-col w-[50vw]'>
            <p className='text-xl'>Customer Facing</p>

          </div>
        </div>
      </div>
    </div>

  )
}

export default MapStuff