import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Loading } from '@nextui-org/react';
import { motion } from 'framer-motion';
import jQuery from 'jquery';
import { FcRefresh } from 'react-icons/fc';
import { Divider } from 'antd';
import { FaSearch } from 'react-icons/fa';


const ZipCards = ({data, isLoading}) => {
  
    

    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [third, setThird] = useState([]);
    const [fourth, setFourth] = useState([]);
    const [fifth, setFifth] = useState([]);

    const [firstRegion, setFirstRegion] = useState([]);
    const [secondRegion, setSecondRegion] = useState([]);
    const [thirdRegion, setThirdRegion] = useState([]);
    const [fourthRegion, setFourthRegion] = useState([]);
    const [fifthRegion, setFifthRegion] = useState([]);


    const[topZips, setTopZips] = useState([]);
    const[topRegions, setTopRegions] = useState([]);
    


    useEffect(() => {

        
        getTopZip();
        getTopRegion();
        
        //console.log(data)
        
    }, [data])

    
   
    function getTopZip(){

        let zipArray = [];
        let zip, count, id, destination;
        let obj = {zip, count, id};
        let ordered = []
    
        
        for(let i = 0; i < data.length; i++){
             zipArray.push(data[i].zip)
        }
        
        id = 0;

       while(zipArray.length != 0){
        count = 1;
        zip = mode(zipArray)
        destination = data.filter(x => x.zip === zip)
        destination = destination[0].slug
        count = zipArray.filter(x => x === zip).length;
        zipArray = zipArray.filter(x => x !== zip)
        id++
        ordered.push({zip:zip, count:count, id:id, destination: destination});
       }

       setTopZips(ordered);

     }
    
     function mode(arr){
         return arr.sort((a,b) =>
               arr.filter(v => v===a).length
             - arr.filter(v => v===b).length
         ).pop();
     }

     function getTopRegion(){
        let zipArray = [];
        let zip, count, id;
        let obj = {zip, count, id};
        let ordered = []
    
        
        for(let i = 0; i < data.length; i++){
             zipArray.push(data[i].slug)
        }
        
        id = 0;

       while(zipArray.length != 0){
        count = 1;
        zip = mode(zipArray)
        count = zipArray.filter(x => x === zip).length;
        zipArray = zipArray.filter(x => x !== zip)
        id++
        ordered.push({zip:zip, count:count, id:id});
       }

       setTopRegions(ordered);


     }
    

    


  return (
    <div>
    
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy dark:text-white flex justify-between w-full border p-4 rounded-lg overflow-hidden'>
            <div className='flex flex-col w-full pb-4 text-black h-[35vh] overflow-y-scroll'>
               {isLoading ? (<p>
                <Loading/>
               </p>) : (
               
                <motion.div
                initial={{ opacity:0, y:-100 }}
                animate={{ opacity:1, y:0, }}
                transition={{ duration:.5 }}
                >
                    <h2 className='dark:text-white mt-1 mb-4 font-medium text-3xl'>Top Zips:</h2>
                    
                    {topZips.map((item, id) => (

                        <li key={id} className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer '>
                            <div className='bg-blue-100 rounded-lg p-3'>
                                <FaSearch className='text-blue-500'/>
                            </div>
                            <div className='pl-4 flex text-slate-700 dark:text-slate-200 items-center'>
                                <div>
                                    <p className="pl-2 text-medium">{item.zip}</p>
                                    <p className='italic'>Searched {item.count + 1} times</p>
                                </div>
                                
                                <p className='italic ml-10'>Goes to: /{item.destination}</p>

                            </div>
                        </li>
                    ))}
                    
                </motion.div>
               )}
                
            </div>
        </div>

        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy dark:text-white flex justify-between w-full border p-4 rounded-lg overflow-hidden'>
            <div className='flex flex-col w-full pb-4 text-black h-[35vh] overflow-y-scroll'>
               {isLoading ? (<p>
                <Loading/>
               </p>) : (
                <motion.div
                initial={{ opacity:0, y:-100 }}
                animate={{ opacity:1, y:0, }}
                transition={{ duration:.5 }}
                >
                    <h2 className='dark:text-white mt-1 mb-4 font-medium text-3xl'>Top Regions:</h2>
                    
                    {topRegions.map((item, id) => (

                        <li key={id} className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
                            <div className='bg-blue-100 rounded-lg p-3'>
                                <FaSearch className='text-blue-500'/>
                            </div>
                            <div className='pl-4 text-slate-700 dark:text-slate-200 items-center'>
                                <p className="pl-2 text-medium">{item.zip}</p>
                                <p className='italic'>Searched {item.count + 1} times</p>

                            </div>
                        </li>
                    ))}
                    
                </motion.div>
               )}
            </div>
        </div>
       
    </div>
    </div>
  )
}

export default ZipCards