import React, {useEffect, useMemo, useState} from 'react'
import { Box, CircularProgress, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import FileStuff from './FileStuff';
import dynamic from 'next/dynamic';
import Calculator from './Calculator';
import { UserAuth } from '../../context/AuthContext';
import History from './History';

const PBZMain = () => {

  const {user, logOut, googleSignIn, userData, userPrivilege} = UserAuth()


    const Tool = useMemo(() => dynamic(
        () => import('./Tool'),
        {
            loading: () => <CircularProgress/>,
            ssr: false
        }
    ), [])

    const PolygonEditor = useMemo(() => dynamic(
      () => import('./PolygonEditor'),
      {
        loading: () => <CircularProgress/>,
        ssr: false
      }
    ))
    
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (e, newValue) => {
      setTabValue(newValue)
    }

  useEffect(() => {
    console.log(user);
    console.log(userPrivilege);
  })

  return (
    <div className='w-full h-[250vh] bg-slate-100 rounded-md'>
        <Box sx={{width: '100%', typography: 'body1'}}>
          <TabContext value={tabValue}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}} >
              <TabList onChange={handleTabChange} aria-label="tabs">
                <Tab  label="Tool" value="1"/>
                <Tab label="Zip Calculator" value="3"/>
                <Tab disabled={userPrivilege == 'liason'} label="File Stuff (Admin)" value="2"/>
                <Tab disabled={userPrivilege == 'liason'} label="Polygon Editor (Not Ready Yet)" value="4"/>
                <Tab label="Usage History" value="5"/>
                
              </TabList>
            </Box>
              <TabPanel value="1">
                <Tool/>
              </TabPanel>
              <TabPanel value="3">
                <Calculator/>
              </TabPanel>

                  <TabPanel value="2">
                    <FileStuff/>
                  </TabPanel>
                  <TabPanel value="4">
                    <PolygonEditor/>
                  </TabPanel>
                  <TabPanel value="5">
                    <History/>
                  </TabPanel>
              
          </TabContext>
        </Box>

    </div>
  )
}

export default PBZMain