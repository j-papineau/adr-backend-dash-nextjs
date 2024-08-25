import React, { useState, useMemo } from 'react'
import { Box, CircularProgress, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import dynamic from 'next/dynamic'
import LoadingWithText from './LoadingWithText'
// import FromRadius from './FromRadius'
// import PolyFromZips from './PolyFromZips'

const MapToolsTab = () => {

    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (e, newValue) => {
        setTabValue(newValue);
    }

    const PolyFromZips = useMemo(() => dynamic(
        () => import('./PolyFromZips'),
        {
            loading: () => <LoadingWithText textDisplay={"loading all zip polygons..."}/>,
            ssr: false
        }
    ), [])

    const FromRadius = useMemo(() => dynamic(
        () => import('./FromRadius'),
        {
            loading: () => <CircularProgress/>,
            ssr: false
        }
    ), [])


  return (

    <div className='h-[200vh]'>
        <div className='p-2 m-2 space-y-2 bg-white rounded-sm'>
            <Box sx={{width: '100%', typography: 'body1'}}>
              <TabContext value={tabValue}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
                  <TabList onChange={handleTabChange} aria-label="tabs">
                    <Tab  label="Import from Zips" value="1"/>
                    <Tab label="Zips from Radius" value="2"/>
        
                  </TabList>
                </Box>
                    <TabPanel value="1">
                        <PolyFromZips/>
                    </TabPanel>

                    <TabPanel value="2">
                        <FromRadius/>
                    </TabPanel>
              </TabContext>
            </Box>
        </div>
    </div>
  )
}

export default MapToolsTab