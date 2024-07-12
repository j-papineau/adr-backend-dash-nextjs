import React, { useEffect, useState } from 'react'
import { Typography, Divider, Input, Button } from '@mui/material'

const StripMarkers = () => {

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [file, setFile] = useState(null);
    const [fixedFile, setFixedFile] = useState(null);

    useEffect(() => {
        if(file != null){
            console.log(file)
            //stip markers from file
            let geojson = JSON.parse(file);
            let filteredFeatures = geojson.features.filter(feature => feature.geometry.type !== "Point");
            
            let filteredGeoJson = {
                ...geojson,
                features: filteredFeatures
            };

            console.log(filteredGeoJson)

        }
    }, [file])

  return (
    <div className='flex flex-col space-y-5'>
        <Typography variant='h5'>Strip Markers from File</Typography>
        <Divider></Divider>
        <div className='flex flex-row space-x-4'>
            <Input disabled type='file' onChange={(e) => {
            setFile(e.target.files[0]);
            }}
        />
            <Button disabled={buttonDisabled}>Download</Button>
        </div>
    </div>
  )
}

export default StripMarkers