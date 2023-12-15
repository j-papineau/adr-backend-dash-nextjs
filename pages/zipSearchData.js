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
import {supabase} from '../supabase/supabase'


const { RangePicker } = DatePicker;


const zipSearchData = () => {

  const dateFormat = "MM/DD/YYYY"

  const [rawData, setRawData] = useState([])
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([dayjs(dayjs(), dateFormat), dayjs(dayjs(), dateFormat)])
  const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/trackingWithSlug.php';
  

  useEffect(() => {

    const getDataSupabase = async () => {
      const {data, error} = await supabase.from("zip_search_tracking").select("id, zip, date, sourceURL, slug:went_to").order('id', { ascending: false })

      setData(data)
      setRawData(data)
      setLoading(false)
      // refreshData()
    }
    getDataSupabase();

    
    }, [])

    function checkLoading(){
      setLoading(!isLoading);
    }

    async function refreshData(){

      setLoading(true);
      const {data, error} = await supabase.from("zip_search_tracking").select("id, zip, date, sourceURL, slug:went_to").order('id', { ascending: false })

      setData(data)
      setRawData(data)
      setLoading(false)
      
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
      <div className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen overflow-x-hidden overflow-y-scroll'>
        <div>
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
          {/*{isLoading ? (<Loading/>) : (*/}
          {/*  <ZipSearchMap data={data}/>*/}
          {/*)}*/}
          <div>
            
          </div>

        </div>
      </div>
  )
}

export default zipSearchData