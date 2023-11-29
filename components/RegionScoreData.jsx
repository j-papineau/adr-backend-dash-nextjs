import React, { useState } from 'react'
import { Alert } from '@mui/material'
import {MdHelpCenter, MdAddBox, MdRefresh} from "react-icons/md"


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
        <div className='flex flex-row justify-center'>
            
            <div className=' h-[70vh] w-[80%] bg-slate-600 rounded-md mx-4 p-2 shadow-md shadow-black'>

                <div className='flex flex-row border bg-slate-200 shadow-md rounded-md'>
                    <p className='text-lg font-semibold p-4 italic'>Available Data Sets</p>
                        <div className='flex flex-row text-lg font-semibold p-4 justify-end w-[80%] text-slate-800 space-x-4'>
                            <a >
                                <MdHelpCenter size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                            <a >
                                <MdAddBox size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                            <a  >
                                <MdRefresh size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                        </div>
                </div>
                <div className='border my-2 h-[85%] rounded-md bg-slate-400 drop-shadow-lg'>

                </div>
            </div>
            {/* <div className=' h-[50vh] w-[60%] bg-slate-400 rounded-md mx-4 p-2 shadow-md shadow-black'>
                
            </div> */}
            
        </div>
    </div>
  )
}

export default RegionScoreData