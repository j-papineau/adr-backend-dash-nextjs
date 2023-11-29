import React, { useState } from 'react'
import { Alert, Box } from '@mui/material'
import {MdHelpCenter, MdAddBox, MdRefresh} from "react-icons/md"
import {Modal} from '@mui/material'
import {Typography} from '@mui/material'


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

    const [openHelp, setOpenHelp] = useState(false);
    const handleHelpOpen = () => setOpenHelp(true);
    const handleHelpClose = () => setOpenHelp(false);

    const [openAdd, setOpenAdd] = useState(false);
    const handleAddOpen = () => setOpenAdd(true);
    const handleAddClose = () => setOpenAdd(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


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
                            <a onClick={handleHelpOpen}>
                                <MdHelpCenter size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                            <a onClick={handleAddOpen}>
                                <MdAddBox size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                            <a >
                                <MdRefresh size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                        </div>
                </div>
                <div className='border my-2 h-[85%] rounded-md bg-slate-400 drop-shadow-lg'>

                </div>
            </div>
        <Modal
        open = {openHelp}
        onClose = {handleHelpClose}
        aria-labelledby="modal-window"
        aria-describedby="help-window">
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Help
                </Typography>
                <Typography sx={{mt: 2}}>
                    Data should be in csv format of specified range from the region comparison report. <br />
                </Typography>
                <a href='https://www.google.com' className='italic underline text-blue-500' target='_blank'>tutorial</a>
            </Box>
        </Modal>

        <Modal
        open = {openAdd}
        onClose = {handleAddClose}
        aria-labelledby="modal-window"
        aria-describedby="help-window">
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Add Data
                </Typography>
            </Box>
        </Modal>
            
        </div>
    </div>
  )
}

export default RegionScoreData