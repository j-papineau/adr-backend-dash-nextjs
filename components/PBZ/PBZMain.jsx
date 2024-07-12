import React, {useMemo, useState} from 'react'
import { Box, CircularProgress, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
// import Tool from './Tool';
import FileStuff from './FileStuff';
import dynamic from 'next/dynamic';

const PBZMain = () => {

    const Tool = useMemo(() => dynamic(
        () => import('./Tool'),
        {
            loading: () => <CircularProgress/>,
            ssr: false
        }
    ), [])
    
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (e, newValue) => {
      setTabValue(newValue)
    }

  return (
    <div className='w-full h-screen bg-slate-100 rounded-md'>
        <Box sx={{width: '100%', typography: 'body1'}}>
          <TabContext value={tabValue}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
              <TabList onChange={handleTabChange} aria-label="tabs">
                <Tab  label="Tool" value="1"/>
                <Tab label="Zip Calculator" value="3"/>
                <Tab label="File Stuff (Admin)" value="2"/>
              </TabList>
            </Box>
              <TabPanel value="1">
                <Tool/>
              </TabPanel>
              <TabPanel value="3">
                <>
                Calculator :)
                </>
              </TabPanel>
              <TabPanel value="2">
                <FileStuff/>
              </TabPanel>
          </TabContext>
        </Box>

    </div>
  )
}

export default PBZMain