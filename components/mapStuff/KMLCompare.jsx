import React, {useEffect, useState} from 'react'
import toGeoJSON from '@mapbox/togeojson';
import { TextField, CircularProgress, Button, Modal, Box, Typography } from '@mui/material'

const KMLCompare = () => {

    const [file, setFile] = useState(null);
    const [newJson, setNewJson] = useState({});
    const [currentJson, setCurrentJson] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const uploadNew = async () => {
        if(file == null){
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();
  
        reader.onload = (e) => {
          const contents = e.target.result;
          var xmlStr = contents;
      
          // Now you can use xmlStr for further processing
          var dom = new DOMParser().parseFromString(xmlStr, 'text/xml');
      
          var geoJson = toGeoJSON.kml(dom);
          setNewJson(geoJson);
            console.log(geoJson)
      
          setIsLoading(false);
        };

        reader.readAsText(file);

    }

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

  return (
    <div className='flex flex-col space-y-2'>
        <p className='text-2xl font-bold'>Compare KML</p>
        <p>This parse may take a while </p>
        <div className='flex flex-row space-x-2'>
            <div className='flex flex-col space-y-2'>
                <TextField type='file' onChange={(e) => {
                    setFile(e.target.files[0]);
                }}/>
                {isLoading ? (<CircularProgress/>) : (<></>)}
            </div>
            <div className='flex flex-col space-y-2'>
                <Button variant='contained' disabled={file == null} onClick={uploadNew}>Compare with current map</Button>
            </div>
        </div>
    </div>
  )
}

export default KMLCompare