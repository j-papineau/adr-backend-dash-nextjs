import React, { useState } from 'react'
import { Alert } from '@mui/material'

const RegionScoreData = () => {

    const [alert, setAlert] = useState({
        "isShowing" : false,
        "text" : "test",
        "severity" : "warning"
    })

    const emptyAlert = {
        "isShowing" : false,
        "text" : "",
        "severity" : "" 
    }

    function testAlert(){
        console.log("click");
        setAlert({
            "isShowing": true,
            "text": "test",
            "severity": "success"
        })
    }

  return (
    <div>
        {/* <button onClick={() => {testAlert()}}>test alert</button> */}
        <div className='m-2'>
        { alert["isShowing"] ? (<Alert severity={alert["severity"]} onClose={() => {setAlert(emptyAlert)}}>{alert["text"]}</Alert>) : (<></>)}
        </div>
        <div className='flex flex-row'>
            
            <div className=' h-[50vh] w-[40%] bg-slate-400 rounded-md mx-4 p-2 shadow-md shadow-black'>
                <p className='text-2xl font-semibold'>Upload Data</p>
            </div>
            <div className=' h-[50vh] w-[60%] bg-slate-400 rounded-md mx-4 p-2 shadow-md shadow-black'>
                
            </div>
            
        </div>
    </div>
  )
}

export default RegionScoreData