import React from 'react'
import Header from '@/components/Header'
import ZipCards from '@/components/ZipCards'
import ZipSeachList from '@/components/ZipSeachList'
import { Card } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import ZipGraphs from '@/components/ZipGraphs'
import axios from 'axios'

const zipSearchData = () => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/trackingWithSlug.php';
  

  useEffect(() => {

    axios.get(url).then((response) => {
        setData(response.data);
        
        setLoading(false);
    })
    
    }, [])

    function checkLoading(){
      setLoading(!isLoading);
    }



  return (
    <div className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
      <p onClick={checkLoading}>Check Loading</p>
        <Header title="Zip Search Data"/>
        <ZipCards data={data} isLoading={isLoading}></ZipCards>

        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
          <ZipGraphs></ZipGraphs>
          <ZipSeachList data={data} isLoading={isLoading}></ZipSeachList>
        </div>
       
    </div>
  )
}

export default zipSearchData