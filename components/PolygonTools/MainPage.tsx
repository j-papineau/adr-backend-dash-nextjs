import { Box, CircularProgress, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel} from '@mui/lab'
import React, {useEffect, useMemo, useState} from 'react'
import ByZips from './ByZips'
import ByRadius from './ByRadius'
import dynamic from 'next/dynamic'
import * as GM from "../.././lib/hooks/GoogleMaps"
import TestIsodistance from './TestIsodistance'

type Props = {}

const MainPage = (props: Props) => {

    const [tabValue, setTabValue] = useState<String>("1");
    const [mapData, setMapData] = useState(null);
    const handleTabChange = (e, newVal: string) => {
        setMapData(null);
        setTabValue(newVal);
    }

    useEffect(() => {console.log("map data changed")}, [mapData])

    const BaseMap = useMemo(() => dynamic(
        () => import('./BaseMap'),
        {
            loading: () => <CircularProgress/>,
            ssr:false
        }
    ), [])

    const TestIsoDistanceTest = useMemo(() => dynamic(
        () => import('./TestIsodistance'),
        {
            loading: () => <CircularProgress/>,
            ssr:false
        }
    ), [])

  return (
    <div className='w-full h-full flex flex-col bg-white shadow'>
        <div>
            <BaseMap mapData={mapData}/>
        </div>
        <div className='flex flex-col'>
            <TabContext value={String(tabValue)}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
                    <TabList onChange={handleTabChange} aria-label="tabs">
                    {/* <Tab  label="Import from Zips" value="1" hidden/>
                    <Tab label="Zips from Radius" value="2" hidden/> */}
                    <Tab label="Zip Codes" value="1"/>
                    <Tab label="Radius" value="2"/>
                    <Tab label="Test Isodistance" value="3" disabled/>
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    <ByZips setMapData={setMapData}/>
                </TabPanel>
                <TabPanel value='2'>
                    <ByRadius/>
                </TabPanel>
                <TabPanel value='3'>
                    <TestIsoDistanceTest/>
                </TabPanel>
            </TabContext>
        </div>
    </div>
  )
}

export default MainPage