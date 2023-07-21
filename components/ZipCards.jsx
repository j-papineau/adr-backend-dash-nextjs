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

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const url = 'https://adrstagingreal.wpengine.com/Joel-Dash/php/pullAllTracking.php';

    


    useEffect(() => {

        axios.get(url).then((response) => {
            setData(response.data);
            setLoading(false);
        })
        
    }, [])




  return (
    <div>
    
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black'>
               {isLoading ? (<p>
                loading
               </p>) : (
                <p>{data[0].zip}</p>
               )}
                
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>+0.5%</span>
            </p>
        </div>
       
    </div>
    </div>
  )
}

export default ZipCards