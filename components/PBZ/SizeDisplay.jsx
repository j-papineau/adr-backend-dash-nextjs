import { Typography } from '@mui/material'
import React from 'react'

const SizeDisplay = ({title, basePrice, baseWeight, perThou, priceMod, isAvailable}) => {
  return (
    <>
    {!isAvailable ? (<></>) : (
        <div className='flex flex-col'>
        <Typography variant='h5'>{title}</Typography>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
            <div className='bg-slate-300 rounded-md p-4 text-center'>
                <Typography variant='p'>Price</Typography>
                <Typography variant='h6'>${basePrice + priceMod}</Typography>
            </div>
            <div className='bg-slate-300 rounded-md p-4 text-center'>
                <Typography variant='p'>Base Weight</Typography>
                <Typography variant='h6'>{baseWeight} lbs.</Typography>
            </div>
            <div className='bg-slate-300 rounded-md p-4 text-center'>
                <Typography variant='p'>Price per thou.</Typography>
                <Typography variant='h6'>${perThou}</Typography>
            </div>
        </div>
        </div>
    )}
    </>
    
  )
}

export default SizeDisplay