import React from 'react'


const DashCards = () => {
  return (
    <div>
    <h2 className='pl-2 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-slate-200'>
        Marketing AaG
    </h2>
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black dark:text-slate-200'>
                <p className='text-2xl font-bold'>345</p>
                <p className=''>Site Visitors This Week</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+0.5%</span>
            </p>
        </div>
        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black dark:text-slate-200'>
                <p className='text-2xl font-bold'>65</p>
                <p className=''>Conversions This Week</p>
            </div>
            <p className='bg-red-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-red-700 text-lg'>-3%</span>
            </p>
        </div>
        <div className='bg-white dark:bg-darculaBG-heavy flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black dark:text-slate-200'>
                <p className='text-2xl font-bold'>72</p>
                <p className=''>Searches This Week</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+20%</span>
                {/* <span className='text-gray-900 text-xs'> since last week</span> */}
            </p>
        </div>
    </div>
    </div>
  )
}

export default DashCards