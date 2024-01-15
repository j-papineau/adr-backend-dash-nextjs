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
      var json = null;
      setFileProcessing(true);
      
      const fr = new FileReader();
      
      fr.readAsText(file, "UTF-8");
      fr.onload = async e => {
        const content = e.target.result;
        json = JSON.parse(content);
        //json is now in object, remove all name attributes
        let features = json.features
        console.log(features)
        var newFeatures = []
        await features.forEach(feature => {
          if (feature.geometry.type != 'Polygon' && feature.geometry.type != "MultiPolygon"){
            
          }else{
            feature.properties.Name = ""
            feature.properties.description = ""
            newFeatures.push(feature);
          }
        });
        json.features = newFeatures;
        console.log(json.features)
        //create and download file
        let jsonString = JSON.stringify(json)
        const blob = new Blob([jsonString], {type:'application/json'})
        //maybe await
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a')
        link.href = href;
        link.download = "geoJSON.json"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setFileProcessing(false);
      }
  }



  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col space-y-4 h-[40vh] w-[40%] bg-slate-300 rounded-md mx-4 p-2 shadow-md shadow-black items-center'>
        <TextField type='file' onChange={(e) => {
          setFile(e.target.files[0])
        }}/>
        <Button disabled={!buttonEnabled} variant="contained" onClick={processFile}>Process File</Button>
        {fileProcessing ? (<CircularProgress/>): (<></>)}
      </div>
    </div>

  )
}

export default JsonConverter