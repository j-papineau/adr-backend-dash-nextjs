import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';


const ZipCards = () => {

    let initialSetting = [
       
        {
            date: '2023-9-99',
            sourceURL: 'test',
            zip: '6969'
        }

    ]

    const [data, setData] = useState([initialSetting]);

    async function getData() {
        try{
            const response = await axios.get('https://adrstagingreal.wpengine.com/Joel-Dash/php/pullAllTracking.php');
           // console.log(response.data);
            const data = response.data;
            setData(prevData => prevData + data);
            return data;
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {

        getData()
        //.then(data => setData(data))
        .then(console.log(data))

    }, [])




  return (
    <div>
    <h2 className='pl-2 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-black'>
        Marketing AaG
    </h2>
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='tet-2xl font-bold'>{data[0].zip}</p>
                
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+0.5%</span>
            </p>
        </div>
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='tet-2xl font-bold'>65</p>
                <p className='text-gray-600'>Conversions This Week</p>
            </div>
            <p className='bg-red-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-red-700 text-lg'>-3%</span>
            </p>
        </div>
        <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='tet-2xl font-bold'>72</p>
                <p className='text-gray-600'>Searches This Week</p>
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

export default ZipCards