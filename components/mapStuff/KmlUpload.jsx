import React, { useState } from 'react'
import { TextField, CircularProgress, Button } from '@mui/material'
import {supabase} from "/supabase/supabase.js"


const KmlUpload = () => {

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapUploaded, setMapUploaded] = useState(false);
  
  const uploadFile = async () => {
    if(file == null){
      return;
    }
  
    //process kml to geoJSON
    
  
  
  }

  return (
    <div className='flex flex-col'>
      <p className='text-2xl font-bold mb-2'>Upload KML</p>
      <div className='flex flex-row'>
        <div className='flex flex-col space-y-2'>

          <p>NOTE: kml upload will automatically convert to geoJSON and send to DB</p>
          <TextField type='file' onChange={(e) => {
            setFile(e.target.files[0]);
          }}/>
          {isLoading ? (<CircularProgress/>) : (<></>)}
        </div>
        <div className='flex flex-col mx-8 space-y-2'>
          <Button variant='contained' disabled={file == null}>Upload File</Button>
          <Button variant='contained' disabled={!mapUploaded}>Change Customer Map</Button>
        </div>
      
      </div>
    </div>
  )
}

export default KmlUpload