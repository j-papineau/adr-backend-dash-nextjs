import React, { useEffect, useState } from 'react'
import { Alert, Box } from '@mui/material'
import {MdHelpCenter, MdAddBox, MdRefresh} from "react-icons/md"
import {Modal} from '@mui/material'
import {Typography} from '@mui/material'
import RegionDataUpload from './RegionDataUpload'
import { DataGrid } from '@mui/x-data-grid'
import { Loading } from '@nextui-org/react'
import { supabase } from '../../supabase/supabase'
import RowEditModal from './RowEditModal'



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

    const [openEdit, setOpenEdit] = useState(false);
    const handleEditOpen = () => setOpenEdit(true);
    const handleEditClose = () => setOpenEdit(false);

    const [tableLoading, setTableLoading] = useState(false)

    const [rows, setRows] = useState([])

    const cols = [
        {field: 'start_date', headerName: 'Start', width: 120},
        {field: 'end_date', headerName: 'End', width: 120},
        {field: 'period', headerName: 'Period'},
        {field: 'dataset_name', headerName: 'Dataset Name', width:300}
    ]

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

      const big_modal_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
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

    useEffect(() => {
        const fetchDataSets = async () => {
            setTableLoading(true)
            //fetch data sets from supabase
            const {data} = await supabase.from("region_score_data").select()
            // console.log(data)
            setRows(data)
            setTableLoading(false)
        }

        fetchDataSets()
    }, [])


    const refreshTable = async () => {
        setTableLoading(true);
        const {data} = await supabase.from("region_score_data").select()
        setRows(data)
        setTableLoading(false)
    }

    //selected obj to send to modal on row select
    const [selectedRow, setSelectedRow] = useState({});



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
                            <a onClick={refreshTable}>
                                <MdRefresh size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                        </div>
                </div>
                <div className='border my-2 h-[85%] rounded-md bg-slate-100 drop-shadow-lg'>
                    { tableLoading ? (<div className='flex flex-col justify-center'><Loading size='xl'/></div>) : (
                        <DataGrid
                        rows={rows}
                        columns={cols}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                pageSize: 10,
                                },
                            },
                            }}
                            pageSizeOptions={[5,10]}
                            onRowClick={(e) => {
                                setSelectedRow(e)
                                handleEditOpen()
                            }} 
                        />
                    )}
                   
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
                <RegionDataUpload handleAddClose={handleAddClose} refreshTable={refreshTable}/>
            </Box>
            
        </Modal>

        <Modal
        open = {openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-window"
        aria-describedby="help-window">
            <Box sx={big_modal_style}>
                <RowEditModal row={selectedRow}/>
            </Box>

        </Modal>
            
        </div>
    </div>
  )
}

export default RegionScoreData