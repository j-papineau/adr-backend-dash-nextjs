import React from 'react'
import SegmentedControl from './SegmentedControl'
import {useRef, useState, useEffect} from 'react'
//import styles from './SegmentedControl.module.css'
import ZipBarChart from './ZipBarChart';
import TopRegionsBar from './TopRegionsBar';


const ZipSearchData = () => {
    const[selectedValue1, setSelectedValue1] = useState("searches");
  return (
    <div className='w-full md:col-span-2 relative  m-auto p-4 border rounded-lg bg-white flex-col justify-center'>
        <div className='flex-row'>
        <div className='container'>
            <SegmentedControl 
            name="controller"
            callback={(val) => setSelectedValue1(val)}
            defaultIndex={0}
            controlRef={useRef()}
            segments={[
                {
                    label: 'Searches',
                    value: 'searches',
                    ref: useRef(),
                },
                {
                    label: 'Top Regions',
                    value:'topRegions',
                    ref: useRef(),
                }
            ]}
            />
        </div>
        
        </div>
        <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
        <div>
           {
            (selectedValue1 === 'searches') && <ZipBarChart></ZipBarChart>
           }
           {
            (selectedValue1 === 'topRegions') && <TopRegionsBar></TopRegionsBar>
           }
        </div>
       
    </div>
  )
}

export default ZipSearchData