import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import toast from "react-hot-toast"
import * as GM from "../../lib/hooks/GoogleMaps"
type Props = {
    setMapData: (e: any) => void;
}

const ByZips = (props: Props) => {

    const [zipInput, setZipInput] = useState<string>("")

    const handleButton = async () => {
        let zipInputCleaned = zipInput.split(",");
        for(let i = 0; i < zipInputCleaned.length; i++){

            zipInputCleaned[i] = zipInputCleaned[i].trim();

            if(zipInputCleaned[i].length != 5){
                toast.error("Zip code " + zipInputCleaned[i] + " is invalid");
                zipInputCleaned[i] = "";
            }
            
        }

        let json = await GM.getGeometryOfZips(zipInputCleaned);
        props.setMapData(json);
    }

  return (
    <div className='flex flex-col space-y-2'>
        <p><strong>Comma Delimited List of Zips </strong></p>
        <TextField 
        placeholder='32164, 32137'
        multiline
        value={zipInput} 
        onChange={(e) => {setZipInput(e.target.value)}}
        rows={8}/>
        <div className='flex flex-row'>
            <Button onClick={handleButton} disabled={zipInput.length < 5} variant='contained'>Draw Polygon</Button>
        </div>
    </div>
  )
}

export default ByZips