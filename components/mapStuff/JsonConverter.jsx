import React, {useEffect, useState} from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'



const JsonConverter = () => {

  const [file, setFile] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [fileDone, setFileDone] = useState(false);

  useEffect(() => {
    if( file == null){
      return;
    }
    setButtonEnabled(true);


  },[file])

  const processFile = () => {
      setFileProcessing(true);
      fileDone(false)
  }



  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <div className='flex flex-col space-y-4 p-4 bg-slate-300 rounded-md mx-4 shadow-md shadow-black items-center'>
          <p className='text-xl'>KML to Json</p>
          <TextField type='file' onChange={(e) => {
            setFile(e.target.files[0])
          }}/>
          <Button disabled={!buttonEnabled} variant="contained" onClick={processFile}>Process File</Button>
          {fileProcessing ? (<CircularProgress/>): (<></>)}
        </div>
        {!fileDone ? (<></>) : (
        <>
        </>
        )}
      </div>
    </div>

  )
}

export default JsonConverter