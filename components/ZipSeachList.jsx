import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Loading } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import moment from 'moment';


const ZipSeachList = ({data, isLoading}) => {

    

    // useEffect(() => {

    // }, [])

    function convertDataDateToTime(input){

        input = Date.parse(input);
        input = moment(input).fromNow();
        return input
    }
   

  return (
    <div className='w-full col-span-1 relative lg:h-[85vh] h-[65vh] m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy overflow-y-scroll overflow-x-hidden '>
      {isLoading ? (<Loading/>) : (

            data.map((item, id) => (
            <li key={id} className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                <div className='bg-blue-100 rounded-lg p-3'>
                    <FaSearch className='text-blue-500'/>
                </div>
                <div className='pl-4 text-slate-700 dark:text-slate-200'>
                    <p className=' font-bold'>{item.zip}</p>
                    <p className=' text-sm'>Returned: {item.slug}</p>
                    <p className=' italic'>From: {item.sourceURL}</p>
                </div>
                <div className='pl-4'>
                
                </div>
                <p className='lg:flex md:hidden absolute right-6 text-sm text-slate-700 dark:text-slate-200 '>{convertDataDateToTime(item.date)}</p>
            
             </li>
  ))



      )}
    </div>
  )
}

export default ZipSeachList
