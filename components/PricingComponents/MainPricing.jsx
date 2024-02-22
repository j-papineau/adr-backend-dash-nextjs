import React, {useMemo} from 'react'
import { CircularProgress, Divider } from '@mui/material'
import dynamic from 'next/dynamic'

const MainPricing = () => {

    const CurrentMap = useMemo(() => dynamic(
        () => import('./CurrentMap'),
        {
            loading: () => <CircularProgress/>,
            ssr:false
        }
    ), [])

  return (
    <div className='flex flex-col bg-slate-200 p-10 m-4 rounded-md'>
        <div className='m-2 p-2'>
            <CurrentMap className="h-[600px]"/>
        </div>
        <Divider/>
      
    </div>
  )
}

export default MainPricing