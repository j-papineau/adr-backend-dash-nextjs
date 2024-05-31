import React, { useEffect, useState } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import {supabase} from "supabase/supabase"
import ThankYouGraph from './ThankYouGraph';


const ThankYouData = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

    }, [])

  return (
    <div className='h-full w-full rounded-md p-4 flex flex-col'>
        <div className='flex flex-row w-full space-x-5 my-5 text-slate-400'>
            <Typography variant='h4'>Thank You Page Data</Typography>
        </div>
        <div className='flex flex-col m-auto space-y-4 text-center '>
            <Typography variant='h5' className='text-white'>Last 7 Days</Typography>
            <ThankYouGraph days={7} doLog={false}/>
            <Typography variant='h5' className='text-white'>Last 30 Days</Typography>
            <ThankYouGraph days={30} doLog={true}/>
            
        </div>
    </div>
  )
}

export default ThankYouData