import React, {useState, useEffect} from 'react'
import { Button, CircularProgress, Input, TextField } from '@mui/material'
import {supabase} from "/supabase/supabase.js"

const KMLChange = () => {

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async () => {
      setIsLoading(true);
      if(file == null)
        return;
      
        let tempFile = file;

        console.log(file)
      const {data, error} = await supabase.storage.from('adr-map').upload('ADR Map (4).kml', file, {
        upsert: true,
        contentType: 'application/vnd.google-earth.kml+xml' 
      });

      if(error){
        alert(error.message)
      }

      alert("File uploaded successfully")

      setIsLoading(false);
      
  }

  return (
    <div className='bg-slate-300 flex flex-col rounded-md p-10 items-center justify-center space-y-4'>
        <p className='text-xl'>KML Upload</p>
        <p>This will change the ADR Map overlay for most implementations</p>
        <TextField type='file' onChange={(e) => {
          setFile(e.target.files[0]);
        }}/>
        <Button variant='contained' onClick={uploadFile}>Upload</Button>
        {isLoading ? (<CircularProgress/>) : (<></>)}
    </div>
  )
}

export default KMLChange