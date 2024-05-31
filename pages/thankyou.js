import { useState } from "react"
import Header from "../components/Header"
import ListView from "../components/ThankYouPageComps/ListView"
import { TabContext, TabPanel, TabList } from "@mui/lab"
import {Tab, Box } from "@mui/material"
import ThankYouData from "../components/ThankYouPageComps/ThankYouData"

export default function ThankYou() {

    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (e, newValue) => {
      setTabValue(newValue)
    }

    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-light min-h-screen'>
        <Header  title="Thank You Pages"/>

        <Box sx={{width: '100%', typography: 'body1'}}>
          <TabContext value={tabValue}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
              <TabList onChange={handleTabChange} aria-label="tabs">
                <Tab  label="Config" value="1"/>
                <Tab label="Data" value="2"/>
              </TabList>
            </Box>
              <TabPanel value="1">
                <ListView/>
              </TabPanel>
              <TabPanel value="2">
                <ThankYouData/>
              </TabPanel>
          </TabContext>
        </Box>

        
        
        
          
      </main>
      </>
    )
  }