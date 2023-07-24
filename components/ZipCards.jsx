import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Loading } from '@nextui-org/react';
import { motion } from 'framer-motion';
import jQuery from 'jquery';
import { FcRefresh } from 'react-icons/fc';


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

    


    useEffect(() => {

        getTopZip();
        getTopRegion();
        //console.log(data)
        
    }, [isLoading])

    
   
    function getTopZip(){

        let zipArray = [];
    
        
        for(let i = 0; i < data.length; i++){
             zipArray.push(data[i].slug)
        }
        
        setFirstRegion(mode(zipArray));
        
        
        zipArray = zipArray.filter(x => x !== firstRegion)

        setSecondRegion(mode(zipArray))

        zipArray = zipArray.filter(x => x !== secondRegion)

        setThirdRegion(mode(zipArray))

        zipArray = zipArray.filter(x => x !== thirdRegion)

        setFourthRegion(mode(zipArray))

        zipArray = zipArray.filter(x => x !== thirdRegion)

        setFifthRegion(mode(zipArray))

     }
    
     function mode(arr){
         return arr.sort((a,b) =>
               arr.filter(v => v===a).length
             - arr.filter(v => v===b).length
         ).pop();
     }

     function getTopRegion(){
        let zipArray = [];
    
        
        for(let i = 0; i < data.length; i++){
             zipArray.push(data[i].zip)
        }
        
        setFirst(mode(zipArray));
        
        
        for(let i = 0; i < zipArray.length; i++){
            if(zipArray[i] === first){
                zipArray.splice(i,i)
            }
        }

        setSecond(mode(zipArray));

        for(let i = 0; i < zipArray.length; i++){
            if(zipArray[i] === second){
                zipArray.splice(i,i)
            }
        }

        setThird(mode(zipArray));

        for(let i = 0; i < zipArray.length; i++){
            if(zipArray[i] === third){
                zipArray.splice(i,i)
            }
        }

        setFourth(mode(zipArray));

        for(let i = 0; i < zipArray.length; i++){
            if(zipArray[i] === fourth){
                zipArray.splice(i,i)
            }
        }

        setFifth(mode(zipArray));


     }
    



  return (
    <div>
    
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy dark:text-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black'>
               {isLoading ? (<p>
                <Loading/>
               </p>) : (
               
                <div>
                    <h2 className='dark:text-white mt-1 mb-4 font-medium text-3xl'>Top 5 Zips:</h2>
                    <div className='dark:text-slate-200 tracking-wide'>
                        <p>1.) {first}</p>
                        <p>2.) {second}</p>
                        <p>3.) {third}</p>
                        <p>4.) {fourth}</p>
                        <p>5.) {fifth}</p>
                    </div>
                </div>
               

               )}
                
            </div>
        </div>

        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy dark:text-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black'>
               {isLoading ? (<p>
                <Loading/>
               </p>) : (
               
                <div>
                    <h2 className='dark:text-white mt-1 mb-4 font-medium text-3xl'>Top 5 Regions:</h2>
                    <div className='dark:text-slate-200 tracking-wide'>
                        <p>1.) {firstRegion}</p>
                        <p>2.) {secondRegion}</p>
                        <p>3.) {thirdRegion}</p>
                        <p>4.) {fourthRegion}</p>
                        <p>5.) {fifthRegion}</p>
                    </div>
                </div>
               )}
            </div>
        </div>
       
    </div>
    </div>
  )
}

export default ZipCards