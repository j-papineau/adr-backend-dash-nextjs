import React, { useEffect, useState } from 'react'
import { Select, Typography, Divider, FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText, CircularProgress, Button,
    Card, CardContent, CardActions, Box} from '@mui/material'
import { Region } from '../../lib/Regions';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import RegionHealthCards from './RegionHealthCards';

const OverallReport = ({data}) => {

    const [parseDone, setParseDone] = useState(false);
    const [dataObjs, setDataObjs] = useState([]);

    const [tabValue, setTabValue] = useState(8)
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const parseRegionsFromRow = (row) => {
        let arr = []

        for(let i = 1; i < row.data.length; i++){
            try {
                let obj = new Region(row.data[i]);
                arr.push(obj)
            } catch (error) {
            }  
        }
        return arr
    }

    useEffect(() => {

        setParseDone(false)

        let tempDataObjs = []
            data.forEach(row => {
                let tempRegionArr = parseRegionsFromRow(row)
                let obj = {
                    id: row.id,
                    range: row.dataset_name,
                    obj: tempRegionArr,
                    start: new Date(row.start_date)
                }
                tempDataObjs.push(obj)
            });

            tempDataObjs.sort((a,b) => a.start - b.start)
            console.log(tempDataObjs)
            setDataObjs(tempDataObjs)
        setParseDone(true)
        
    }, [data])

  return (
    <div className='flex flex-col max-w-[900px]'>
        {parseDone ? (
        <>
        <Box className="overflow-scroll flex flex-col" sx={{ width: '100%', height: 600, typography: 'body1'}}>
            <TabContext value={tabValue}>
                <TabList variant='scrollable' onChange={handleTabChange} aria-label='months'>

                        {dataObjs.map((item) => (
                        <Tab label={item.range} key={item.id} value={item.id}/>  
                        ))}
                    
                </TabList>

                {dataObjs.map((item) => (
                    <TabPanel value={item.id}>
                        <RegionHealthCards data={item}/>
                    </TabPanel>
                ))}

            </TabContext>

            {/* <Select className='w-[100px]'>
                {dataObjs.map((item) => (
                    <MenuItem label={item.range} key={item.id} value={item.id}>{item.range}</MenuItem>  
                ))} 
            </Select> */}

        </Box>
        </>) : (<><p>Note: this is a large report and may take a while</p><CircularProgress/></>)}

        

    </div>
  )
}

export default OverallReport