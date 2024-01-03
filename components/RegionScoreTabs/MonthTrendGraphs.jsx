import React, { useEffect, useState } from 'react'
import { Typography, CircularProgress, Box} from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { supabase } from '../../supabase/supabase'
import { Region } from '../../lib/Regions'
import {RegionTS} from '../../lib/RegionTS'
import MetricTrendGraph from './MetricTrendGraph';
import MonthCompoundGraph from './MonthCompoundGraph';
import DeviationComparison from './DeviationComparison';
import GenericGraph from './GenericGraph';
import { Data } from '@react-google-maps/api';

const MonthTrendGraphs = ({selectedRegion}) => {

    const [graphLoading, setGraphLoading] = useState(true)
    const [dataMap, setDataMap] = useState({})
    const [scoreGraphData, setScoreGraphData] = useState({})
    
    
    useEffect(() => {

        /*
        Takes in a row from the select * query and pulls out the corresponding 
        data for the current region and returns it as a region obj
        */
        const extractRegion = async (row) => {
            let data = row["data"]
            let obj = null
            data.forEach((dataRow) => {
                if(dataRow[0] == selectedRegion.name){
                    obj = new Region(dataRow)
                }
            })
            if(obj == null){
                return null
            }else{
                return obj
            }
        }

        function convertTimestampToMMDDYYYY(timestamp) {
            const date = new Date(timestamp);
            
            // Extract month, day, and year components
            const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            
            // Format into MM/DD/YYYY
            return `${month}/${day}/${year}`;
        }


        const pullData = async () => {
            const {data, error} = await supabase.from("region_score_data").select().eq("period", "month")
            
            let tempArr = []

            for (const row of data) {
                let date = row["start_date"]
                date = new Date(date)
                let id = row["id"]
                let obj = await extractRegion(row)
                if(obj != null){
                    let dataObj = {
                        "date": date,
                        "score": obj.score,
                        "clicks": obj.clicks,
                        "cpc": obj.cost_per_click,
                        "cpl": obj.cost_per_lead,
                        "closing_rate": obj.closing_rate,
                        "ctl": obj.click_to_lead,
                        
                    }
                    
                    tempArr.push(dataObj)
                }
            }

            tempArr.sort((a,b) => a.date - b.date)

            setDataMap(tempArr)
            setGraphLoading(false)  
        }

        setGraphLoading(true)
        pullData();
    }, [selectedRegion])


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    


  return (
    <div>
        <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
            Trends for {selectedRegion.name} (Last 6 Months)
        </Typography>
        {graphLoading ? (<CircularProgress/>) : (
        <>
        <Box sx={{ width: '100%', height: 400, typography: 'body1' }}>
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="analytics graph visual">
                    <Tab label="Deviation" value="1"/>
                    <Tab label="All" value="2" disabled/>
                    <Tab label="Score" value="3" />
                    <Tab label="CpL" value="4" />
                    <Tab label="CtL" value = "5" />
                </TabList>
                </Box>
                <TabPanel value='1'>
                    <DeviationComparison dataMap={dataMap}/>
                </TabPanel>
                <TabPanel value="2">
                    <MonthCompoundGraph dataMap={dataMap}/>
                </TabPanel>
                <TabPanel value="3"><GenericGraph dataMap={dataMap} metric={"score"} target={50}/></TabPanel>
                <TabPanel value="4"><GenericGraph dataMap={dataMap} metric={"cpl"} target={22}/></TabPanel>
                <TabPanel value="5"><GenericGraph dataMap={dataMap} metric={"ctl"} target={28}/></TabPanel>
            </TabContext>
        </Box>
        </>)}
    </div>
  )
}

export default MonthTrendGraphs