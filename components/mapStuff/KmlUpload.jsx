'use client'
import dynamic from 'next/dynamic'
import React, { useState, useMemo } from 'react'
import { TextField, CircularProgress, Button, Modal, Box, Typography } from '@mui/material'
import {supabase} from "/supabase/supabase.js"
import toGeoJSON from '@mapbox/togeojson'
import { featureGroup, geoJson } from 'leaflet';
import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet"
// import ModalMap from './ModalMap'
// import "leaflet/dist/leaflet.css"



const KmlUpload = () => {

  const ModalMap = useMemo(() => dynamic(
    () => import('./ModalMap'),
    {
      loading: () => <CircularProgress/>,
      ssr: false
    }
  ), [])

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapUploaded, setMapUploaded] = useState(false);
  const [tempJson, setTempJson] = useState({})
  const [finalJSON, setFinalJson] = useState(null);
  
  const uploadFile = async () => {
    if (file == null) {
      return;
    }
  
    setIsLoading(true);
    setFinalJson(null);
  
    // process kml to geoJSON
  
    // creates XMLDOM from file string
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const contents = e.target.result;
      var xmlStr = contents;
  
      // Now you can use xmlStr for further processing
      var dom = new DOMParser().parseFromString(xmlStr, 'text/xml');
  
      var geoJson = toGeoJSON.kml(dom);
      setTempJson(geoJson);
      console.log(geoJson);
      // popup map??
      handleOpen();
  
      setIsLoading(false);
    };
  
    // Start reading the file
    reader.readAsText(file);
  };

  const updateMaps = async () => {
    setIsLoading(true);
    await uploadInternal();
    await uploadCustomer();
    setIsLoading(false);
  }

  const uploadCustomer = async() => {
    //parse strip markers and others

    // const {data, error} = await supabase.storage.from('map-jsons').upload('customer', finalJSON, {
    //   cacheControl: '3600',
    //   upsert: true,
    //   contentType: 'application/json'
    // })
    // if(error){
    //   alert(error.message)
    // }
    // console.log(finalJSON.features);
    // console.log("parsing");

    let jsonCopy = finalJSON;

    let tempFeat = jsonCopy.features;
    let finalFeat = [];

    tempFeat.forEach(feature => {
      // console.log(feature.geometry)
      if(feature.geometry.type == "Polygon" || feature.geometry.type == "GeometryCollection"){
        feature.properties = ""
        finalFeat.push(feature)
      }
    });

    // console.log(finalFeat)
    jsonCopy.features = finalFeat;
    // console.log(jsonCopy.features)

    const {data, error} = await supabase.from('maps').update({map_data:jsonCopy}).eq('id', 2);

    if(error){
      alert(error.message)
    }

  }

  const uploadInternal = async() => {
    const {data, error} = await supabase.from('maps').update({map_data:finalJSON}).eq('id', 3)
    if(error){
      alert(error.message)
    }
  }
  

  //modal stuff
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleOpen = () => setPreviewOpen(true);
  const handleClose = () => setPreviewOpen(false);
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
          <Button variant='contained' disabled={file == null} onClick={uploadFile}>Upload</Button>
          <Button color='secondary' variant='contained' disabled={finalJSON == null} onClick={updateMaps} >Update Maps</Button>
          <p>Note: Customer map will handle stripping the file to just polygons</p>
        </div>

        <Modal
        open={previewOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  Does This Look Right?
              </Typography>
                  {/* map */}
              <ModalMap geoJson={tempJson}/>

              <div className='flex flex-row space-x-4 items-center justify-center mt-4'>
                  <Button variant='contained' color='success' onClick={() => {
                    setFinalJson(tempJson);
                    handleClose();
                  }}>Yes</Button>
                  <Button variant='contained' color='error' onClick={() => {
                    setFinalJson(null);
                    handleClose();
                  }}>No</Button>
              </div>
          </div>
          </Box>
        </Modal>
      
      </div>
    </div>
  )
}

export default KmlUpload