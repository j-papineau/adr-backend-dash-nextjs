import React, { useEffect, useState } from 'react'
import { Select, Typography, Divider, FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText, CircularProgress, Button,
Card, CardContent, CardActions} from '@mui/material'
import { supabase } from '../../supabase/supabase';
import MonthCards from './MonthCards';
import {Region} from 'lib/Regions.js'
import { jsx } from '@emotion/react';
import AvgCard from './AvgCard';

const MonthComparison = () => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectLoading, setSelectLoading] = useState(true)
    const [datasets, setDatasets] = useState([])
    const [sumObj, setSumObj] = useState(null)

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value)
    }


    useEffect(() => {
        const getMonths = async () => {
            const {data} = await supabase.from("region_score_data").select("id, dataset_name").eq("period", "month")
            setDatasets(data)
            setSelectLoading(false)
        }
        getMonths();
    }, [])

    /*
        Creates Region Objects from the Regions.js lib file, do not render region select box until all regions parsed
    */
    const createRegionObjects = async () => {
        //reset regions obj
        setRegionsObj([])
        setRegionsParsed(false)
        setBigParseDone(true)
        setReportLoading(true)
        //pull data required
        const {data, error} = await supabase.from("region_score_data").select("data").eq("dataset_name", selectedMonth)

        if(error){
            //error handler (duh)
            return
        }

        let rows = data[0].data
        rows.shift() //remove first element which is the headers

        let tempArr = []
        let count = 0
        let emptyarr = Array(25).fill("1")
        let tempObj = new Region(emptyarr)
        rows.forEach(row => {
            if(!row.includes("")){
                let obj = new Region(row)
                tempArr.push(obj)
                tempObj.increment(row)
                count += 1
            }
        });
        tempObj.name = selectedMonth
        tempObj.parseAv(count)
        setSumObj(tempObj)


        setRegionsObj(tempArr)
        setRegionsParsed(true)
    }

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value)
        bigParse()
    }

    const [regionsParsed, setRegionsParsed] = useState(false)
    const [regionsObj, setRegionsObj] = useState([])
    const [reportLoading, setReportLoading] = useState(true)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [bigParseDone, setBigParseDone] = useState(false)
    

    const [selectedRegionObj, setSelectedRegionObj] = useState(null)

    /* 
        on change event for when a region is selected for reporting
        this function is the big one for calculating changes
    */
    const bigParse = async () => {
        
        setReportLoading(true)
        setBigParseDone(false)
        

        setReportLoading(false)
        setBigParseDone(true)

    }

  return (
    <div className='flex flex-col h-[90vh] w-[1000px] p-2'>
        <div className='flex flex-row space-x-4 items-center'>
            { selectLoading ? (<CircularProgress/>) : (
                <>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="months-label">Month</InputLabel>
                    <Select
                       labelId='select-label'
                       id='select-month'
                       value={selectedMonth}
                       label="Month"
                       onChange={handleMonthChange}
                    >
                        {datasets.map((item) => (
                            <MenuItem key={item.id} value={item.dataset_name}>
                                <ListItemText primary={item.dataset_name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </>
            )}
            <Button className='h-[50px]' variant='contained' onClick={createRegionObjects}>Run Report</Button>

            { !regionsParsed ? (<></>) : (
                <>
                    <FormControl sx={{m:1, width:200}}>
                        <InputLabel id="region-select">Region</InputLabel>
                        <Select
                            labelId='region-select'
                            id='select-region'
                            value={selectedRegion}
                            label="Region"
                            onChange={handleRegionChange}
                        >
                            {regionsObj.map((item) => (
                                <MenuItem key={item.name} value={item}>
                                    <ListItemText primary={item.name}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    { !bigParseDone ? (<><CircularProgress/></>) : (<></>)}
                    <AvgCard obj={sumObj}/>
                </>
            )}

        </div>
        <div className='my-2'>
            <Divider/>
        </div>
        <div className='bg-slate-100 w-[82vw] h-[75vh] p-4 rounded-md flex flex-col'>
            { reportLoading ? (<></>) : (
                <>
                    <MonthCards selected={selectedRegion} sumObj={sumObj}/>
                    <Divider/>   
                </>
            )}
        </div>
    </div>
  )
}

export default MonthComparison