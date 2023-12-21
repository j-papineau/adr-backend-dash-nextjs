import React, { useEffect, useState } from 'react'
import { Typography, CircularProgress, Box} from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { supabase } from '../../supabase/supabase'
import { Region } from '../../lib/Regions'
import MetricTrendGraph from './MetricTrendGraph';
import MonthCompoundGraph from './MonthCompoundGraph';

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


        const pullData = async () => {
            const {data, error} = await supabase.from("region_score_data").select().eq("period", "month")
            
            let tempArr = {}

            data.forEach(async (row) => {
                let date = row["created_at"]
                let obj = await extractRegion(row)
                if(obj != null){
                    tempArr[date] = obj
                }
            })

            setDataMap(tempArr)
            console.log(dataMap)  
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
            Trends for {selectedRegion.name}
        </Typography>
        {graphLoading ? (<CircularProgress/>) : (
        <>
        <Box sx={{ width: '100%', height: 400, typography: 'body1' }}>
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="analytics graph visual">
                    <Tab label="All" value="1"/>
                    <Tab label="Score" value="2" />
                    <Tab label="CtL" value="3" />
                    <Tab label="CpL" value="4" />
                </TabList>
                </Box>
                <TabPanel value='1'>
                    <MonthCompoundGraph/>
                </TabPanel>
                <TabPanel value="2">
                    <MetricTrendGraph/>
                </TabPanel>
                <TabPanel value="3">CtL</TabPanel>
                <TabPanel value="4">CpL</TabPanel>
            </TabContext>
        </Box>
        </>)}
    </div>
  )
}

export default MonthTrendGraphs