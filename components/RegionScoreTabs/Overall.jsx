import React, { useEffect, useState } from 'react'
import { Select, Typography, Divider, FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText, CircularProgress, Button,
  Card, CardContent, CardActions} from '@mui/material'
import { supabase } from '../../supabase/supabase'
import OverallReport from './OverallReport';


const Overall = () => {

  const [reportLoading, setReportLoading] = useState(false);
  const [reportLoaded, setReportLoaded] = useState(false);

  const [data, setData] = useState({})


  const runReport = async () => {
    setReportLoading(true);
    setReportLoaded(false);
    const {data, error} = await supabase.from("region_score_data").select()
    setData(data);
    setReportLoading(false)
    setReportLoaded(true)
  }


  return (
    <div className='flex flex-col p-2 overflow-scroll space-y-2'>
      <div className='flex flex-row space-x-4 items-center'>
        <Typography variant='h4' fontWeight={"heavy"} fontSize={22}>Overall Health</Typography>
        <Button variant='contained' onClick={runReport}>Run Report</Button>
        {reportLoading ? (<CircularProgress/>) : (<></>)}
      </div>

      <Divider/>

      <div id='reportArea'>
        {reportLoaded ? (
        <>
          <div>
            <OverallReport data={data} />
          </div>
        </>): (<></>)}
      </div>
    </div>
  )
}

export default Overall