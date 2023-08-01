import React from 'react'
import Header from '@/components/Header'
import ZipCards from '@/components/ZipCards'
import ZipSeachList from '@/components/ZipSeachList'
import { Card } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import ZipGraphs from '@/components/ZipGraphs'
import axios from 'axios'
import { Button, Loading } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import ZipSearchMap from '@/components/ZipSearchMap'


const zipSearchData = () => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/trackingWithSlug.php';
  

  useEffect(() => {

    axios.get(url).then(async (response) => {
        
        setData(response.data);
        
        setLoading(false);
        refreshData();
    })
    
    }, [])

    function checkLoading(){
      setLoading(!isLoading);
    }

    async function refreshData(){
      setLoading(true);

      await delay(400);
      axios.get(url).then((response) => {
        setData(response.data);
        
        setLoading(false);
      })

    }

    function delay(time){
      return new Promise(resolve => setTimeout(resolve, time))
    }



  return (
    <AnimatePresence>
        <div className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen overflow-x-hidden overflow-y-scroll'>
      <motion.div>
        <Header title="Zip Search Data"/>
        <Button onPress={refreshData} className='mr-10 ml-10'>Refresh Data</Button>
        <ZipCards data={data} isLoading={isLoading}></ZipCards>

        <div className='p-4 grid lg:grid-cols-3 grid-cols-1 gap-4'>
          <ZipGraphs data={data} isLoading={isLoading}></ZipGraphs>
          <ZipSeachList data={data} isLoading={isLoading}></ZipSeachList>
        </div>
        {isLoading ? (<Loading/>) : (
          <ZipSearchMap data={data}/>
        )}
        
      </motion.div>  
    </div>




    </AnimatePresence>
    
  )
}

export default zipSearchData