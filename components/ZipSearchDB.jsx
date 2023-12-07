import React from 'react'
import { Typography } from '@mui/material'
import { MdHelpCenter, MdAddBox, MdRefresh } from 'react-icons/md'

const ZipSearchDB = () => {
  return (
    <div className='h-screen w-full bg-slate-900 overflow-hidden rounded-md p-4 flex flex-col'>
        <div className="flex flex-row w-full space-x-5">
            <Typography variant='h4'>Zip Search DB</Typography>
            <Typography variant='p' color={"gray"}>(data source: "https://ydtalmcsutkxxlyoskoq.supabase.co")</Typography>
        </div>
        <div className='flex flex-row m-auto'>

            <div className='flex flex-row justify-center'>
                <div className=' h-[70vh] w-[500px] bg-slate-200 rounded-md mx-4 p-2 shadow-md shadow-black'>

                    
                </div>
            </div>
            <div className='flex flex-row justify-center'>
                <div className=' h-[80vh] w-[80vh] bg-slate-600 rounded-md mx-4 p-2 shadow-md shadow-black'>

                    <div className='flex flex-row border bg-slate-200 shadow-md rounded-md'>
                        <p className='text-lg font-semibold p-4 italic text-black'>Zips n Slugs</p>
                            <div className='flex flex-row text-lg font-semibold p-4 justify-end w-[80%] text-slate-800 space-x-4'>
                                    <MdHelpCenter size={30} className='hover:text-white drop-shadow-md'/>
                            </div>
                    </div>
                    <div className='border my-2 h-[85%] rounded-md bg-slate-400 drop-shadow-lg'>
                        {/* table goes here  */}
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ZipSearchDB