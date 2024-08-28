import { Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState} from 'react'

const SizeDisplay = ({title, basePrice, baseWeight, perThou, priceMod, isAvailable}) => {



  return (
    <>
    {!isAvailable ? (<></>) : (
        <div className='flex flex-col'>
            <div className='flex flex-row space-x-2 align-middle items-center'>
                <Typography variant='h5'>{title}</Typography>
                {(priceMod > 100) ? (
                    // <Tooltip title={'add ' + priceMod + "$"}>
                        <p className='p-2 bg-yellow-100 rounded-full border border-yellow-700 drop-shadow-md'>OOA</p>
                    // </Tooltip>
                    ) : (<></>)}
            </div>
        
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
            <div className='bg-slate-300 rounded-md p-4 text-center drop-shadow-md'>
                <Typography variant='p'>Price</Typography>
                <Typography variant='h6'>${basePrice + priceMod}</Typography>
            </div>
            <div className='bg-slate-300 rounded-md p-4 text-center drop-shadow-md'>
                <Typography variant='p'>Base Weight</Typography>
                <Typography variant='h6'>{baseWeight} lbs.</Typography>
            </div>
            <div className='bg-slate-300 rounded-md p-4 text-center drop-shadow-md'>
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