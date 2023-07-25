import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Loading } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import moment, { duration } from 'moment';
import { motion } from 'framer-motion';


const ZipSeachList = ({data, isLoading}) => {

    

    // useEffect(() => {

    // }, [])

    function convertDataDateToTime(input){

        input = Date.parse(input);
        input = moment(input).fromNow();
        return input
    }
   
    function convertURL(url){
      let current = url.substring(36);
      if(current === '/')
        current = "home"
      return current 
    }

  return (
    <div className='w-full col-span-1 relative h-screen m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy overflow-y-scroll overflow-x-hidden '>
      <h2 className='text-xl text-black dark:text-white font-poppins '>Search Feed</h2>
      {isLoading ? (<Loading/>) : (
          
            data.map((item, id) => (
            <motion.div
            initial={{x:500}}
            animate={{x:0}}
            transition={{duration:.7}}
            >
              <li key={id} className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                <div className='bg-blue-100 rounded-lg p-3'>
                    <FaSearch className='text-blue-500'/>
                </div>
                <div className='pl-4 text-slate-700 dark:text-slate-200'>
                    <p className=' font-bold'>{item.zip}</p>
                    <p className=' text-sm'>Returned: {item.slug}</p>
                    <p className=' italic'>From: {convertURL(item.sourceURL)}</p>
                </div>
                <div className='pl-4'>
                
                </div>
                <p className='lg:flex md:hidden absolute right-6 text-sm text-slate-700 dark:text-slate-200 '>{convertDataDateToTime(item.date)}</p>
            
              </li>
            </motion.div>
            
            ))



      )}
    </div>
  )
}

export default ZipSeachList
