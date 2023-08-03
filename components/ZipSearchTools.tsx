import React, {useEffect, useState} from 'react'
import { Tabs, Tab, Box} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import CheckZips from "../components/CheckZips"


type Props = {}

const ZipSearchTools = (props: Props) => {
  
    const [value, setValue] = useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
  
    return (
    <div className='text-black dark:text-white'>
        <TabContext value={value}>
        <Box sx={{width: "100%"}}>
            <Tabs centered
                value={value}
                onChange={handleChange}
                aria-label='nav tabs'
                textColor='inherit'
                indicatorColor='primary'
            >
                <Tab
                value="one"
                label="Check/Delete Zips"
                wrapped />
                <Tab
                value="two"
                label="label two"
                wrapped
                 />
                <Tab
                value="three"
                label="label three"
                wrapped />
            </Tabs>
        </Box>

        <TabPanel value='one'>
            <div className='text-black dark:text-white'>
                <CheckZips/>
            </div>
        </TabPanel>
        <TabPanel value='two'>Item Two</TabPanel>
        <TabPanel value='three'>Item Three</TabPanel>

        </TabContext>
    </div>
  )
}

export default ZipSearchTools