import React from 'react'
import SegmentedControl from './SegmentedControl'
import {useRef, useState, useEffect} from 'react'
//import styles from './SegmentedControl.module.css'
import ZipBarChart from './ZipBarChart';
import TopRegionsBar from './TopRegionsBar';
import { Divider } from 'antd';
import { motion } from 'framer-motion';

/*

    THIS IS THE STATIC DEMO COMPONENT

*/

const ZipSearchData = () => {
    const[selectedValue1, setSelectedValue1] = useState("searches");
  return (
    <motion.div className='w-full md:col-span-2 relative  m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy flex-col justify-center'>
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
        <Divider className='bg-black dark:bg-slate-200'/>
        <div >
           {
            (selectedValue1 === 'searches') && <ZipBarChart></ZipBarChart>
           }
           {
            (selectedValue1 === 'topRegions') && <TopRegionsBar></TopRegionsBar>
           }
        </div>
       
    </motion.div>
  )
}

export default ZipSearchData