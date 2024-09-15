import React, { useState, useMemo } from 'react'
import { Box, CircularProgress, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import dynamic from 'next/dynamic'
import LoadingWithText from './LoadingWithText'

// import FromRadius from './FromRadius'
// import PolyFromZips from './PolyFromZips'

const MapToolsTab = () => {

    const [tabValue, setTabValue] = useState('3');

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

    const ByZip = useMemo(() => dynamic(
      () => import('./ByZip'),
      {
        loading: () => <CircularProgress/>,
        ssr: false
      }
      
    ), [])

    const CTLByZip = useMemo(() => dynamic(
      () => import('./CTLByZip'),
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
                    {/* <Tab  label="Import from Zips" value="1" hidden/>
                    <Tab label="Zips from Radius" value="2" hidden/> */}
                    <Tab label="Closing by Zip" value="3"/>
                    <Tab label="Google Ads By Zip" value="4"/>
                  </TabList>
                </Box>
                    {/* <TabPanel value="1">
                        <PolyFromZips/>
                    </TabPanel>

                    <TabPanel value="2">
                        <FromRadius/>
                    </TabPanel> */}

                    <TabPanel value="3">
                        <ByZip/>
                    </TabPanel>
                    <TabPanel value="4">
                      <CTLByZip/>
                    </TabPanel>
              </TabContext>
            </Box>
        </div>
    </div>
  )
}

export default MapToolsTab