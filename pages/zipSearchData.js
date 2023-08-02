import React from 'react'
import Header from '../components/Header'
import ZipCards from '../components/ZipCards'
import ZipSeachList from '../components/ZipSeachList'
import { Card } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import ZipGraphs from '../components/ZipGraphs'
import axios from 'axios'
import { Button, Loading, Input } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import ZipSearchMap from '../components/ZipSearchMap'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker;


const zipSearchData = () => {

  const dateFormat = "MM/DD/YYYY"

  const [rawData, setRawData] = useState([])
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([dayjs(dayjs(), dateFormat), dayjs(dayjs(), dateFormat)])
  const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/trackingWithSlug.php';
  

  useEffect(() => {

    axios.get(url).then(async (response) => {
        
        
        setRawData(response.data)
        setData(response.data)
        
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

    function dataInRange(e){
      if(e[0] === null || e[1] === null ){
        console.log("prevented invalid date")
      }else{
      
      const startDate = e[0].toDate()
      const endDate = e[1].toDate()

      console.log(startDate + " to " + endDate)

     
      //console.log(data)
      var filteredData = rawData.filter(item => {
        const currentDate = new Date(item.date)
        return currentDate >= startDate && currentDate <= endDate
      })

    
      setData(filteredData)
    }
    }

    function delay(time){
      return new Promise(resolve => setTimeout(resolve, time))
    }



    function dateRangeChange(e){
      setDateRange(e)
     
    }

  return (
    <AnimatePresence>
        <div className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen overflow-x-hidden overflow-y-scroll'>
      <motion.div>
        <Header title="Zip Search Data"/>
        <div className='flex flex-row p-4 justify-evenly items-center'>
          <Button onPress={refreshData} className='mr-10 ml-10'>Refresh Data</Button>
          
         <RangePicker
         defaultValue={dateRange}
         format={dateFormat}
         onCalendarChange={(e) => {
          setDateRange(e)
          dataInRange(e)
         }}
         />
        
          
        </div>
        <ZipCards data={data} isLoading={isLoading}></ZipCards>

        <div className='p-4 grid lg:grid-cols-3 grid-cols-1 gap-4'>
          <ZipGraphs data={data} rawData={rawData} isLoading={isLoading}></ZipGraphs>
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