import React, { useEffect, useState } from 'react'
import { Input, Typography, Divider, Button} from '@mui/material'
import {supabase} from "/supabase/supabase.js"


const ReplaceFile = () => {

    const [file, setFile] = useState(null);
    const [btnD, setBtnD] = useState(true);
    const [fileURL, setFileURL] = useState("");

    useEffect(() => {

        const getFileURL = async () =>  {
            //get file url from supabase
            const { data } = supabase.storage.from('pricing-by-zip').getPublicUrl('PBZmap.geojson');
            console.log(data)
            setFileURL(data.publicUrl);
        }

        getFileURL();

        if(file != null){
            console.log(file)
            setBtnD(false);
        }

        
    }, [file])

    const uploadFile = async () => {
        if(confirm("are you sure?")){
            console.log("uploading file")
            const {data, error} = await supabase.storage.from("pricing-by-zip").update("PBZmap.geojson", file, {
                cacheControl: '60',
                upsert: true
            })

            if(error){
                console.log(error)
            }else{
                alert("file uploaded succesfully :)")
            }
        }
    }

  return (
    <div className='flex flex-col space-y-4'>
            <Typography variant='h5'>Update File</Typography>
            <Divider></Divider>
            <div className='flex flex-row space-x-4'>
                <Input className='m-2' type='file' onChange={(e) => {
                setFile(e.target.files[0]);
                }}>
                </Input>
                <div className='flex flex-col space-y-2'>
                    <Button disabled={btnD} variant='contained' onClick={uploadFile}>Upload</Button>
                    <Typography color={"red"}>WARNING: this will replace the current file</Typography>
                </div>
                <div className='flex flex-col space-y-2'>
                    <div className='rounded-md p-2 bg-blue-600 hover:bg-blue-400'>
                        <a href={fileURL} download={"adrmap.geojson"} className='text-white'>Download Current Map</a>
                    </div>
                </div>
            </div>
            
    </div>
  )
}

export default ReplaceFile