import React, {useState} from 'react'
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Loading } from '@nextui-org/react';
import {supabase} from '../../supabase/supabase'
import Papa from 'papaparse'


const RegionDataUpload = () => {

  const [file, setFile] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("")
  const [period, setPeriod] = useState("")

  const attemptUpload = async () => {
    setIsLoading(true);
    setErrorText("");
    console.log(file);
    console.log(startDate);
    console.log(endDate);

    let uploadData;

    if(file === null || startDate === null || endDate === null || period === ""){
      setErrorText("all fields are necessary")
      setIsLoading(false);
      return;
    }else{
      //parse csv
        Papa.parse(file, {
          complete: async function(results) {
            console.log(results.data)
            uploadData = results.data
            const {error} = await supabase.from("region_score_data").insert({start_date: startDate, end_date: endDate, data: uploadData, period: period})
          }
        })
      
        //send all data to supabase

       
        setIsLoading(false);

    }
  }


  return (
    <div className='flex flex-col space-y-2'>
        <Typography variant="h6" component="h2">
            Upload Data
        </Typography>
        <TextField type='file' onChange={(e) => {
          setFile(e.target.files[0])
        }}/>
        <p>Start Date</p>
        <TextField type='date' onChange={(e) => {
          setStartDate(e.target.value)
        }}/>
        <p>End Date</p>
        <TextField type='date' onChange={(e) => {
          setEndDate(e.target.value);
        }}/>

        <p>Period</p>
        <FormControl>
          <InputLabel id="label"></InputLabel>
          <Select labelId="label" value={period} onChange={(e) => {
            setPeriod(e.target.value)
          }}>
            <MenuItem value={"week"}>Week</MenuItem>
            <MenuItem value={"month"}>Month</MenuItem>
          </Select>
        </FormControl>
        

        <Button variant='outlined' onClick={attemptUpload}>Upload</Button>

        {isLoading ? (<><Loading/></>) : (<></>)}
        <p className='text-center text-red-400'>{errorText}</p>

    </div>
  )
}

export default RegionDataUpload