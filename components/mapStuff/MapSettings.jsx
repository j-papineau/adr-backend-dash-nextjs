import React, {useEffect, useState} from 'react'
import { Alert, Box, CircularProgress, Modal } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {supabase} from "/supabase/supabase.js"
import { MdRefresh, MdAddBox } from 'react-icons/md'
import SettingsModal from './SettingsModal'
import AddMapSettings from './AddMapSettings'
import OnSiteMap from './OnSiteMap'


const MapSettings = () => {

    const [tableLoading, setTableLoading] = useState(true);
    const [rows, setRows] = useState([])

    const cols = [
        {field: 'region', headerName: 'Region'},
        {field: 'map_lat', headerName:'Center Lat'},
        {field: 'map_lng', headerName:'Center Lng'},
        {field: 'map_zoom', headerName:'Zoom'}
    ]

    const big_modal_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        innerHeight:600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
      
    const add_modal_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

    //modal vars
    const [openEdit, setOpenEdit] = useState(false);
    const handleEditOpen = () => setOpenEdit(true);
    const handleEditClose = () => setOpenEdit(false);

    const [openAdd, setOpenAdd] = useState(false);
    const handleAddOpen = () => setOpenAdd(true);
    const handleAddClose = () => setOpenAdd(false);

    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setTableLoading(true);
            const {data} = await supabase.from('map_settings').select()
            setRows(data)
            setTableLoading(false);
        }

        fetchData();
    },[])

    const refreshTable = async () => {
        setTableLoading(true);
        const {data} = await supabase.from("map_settings").select()
        setRows(data)
        setTableLoading(false)
    }

  return (
    <div className='flex lg:flex-row items-center justify-center'>
        <div className=' h-[70vh] w-[50%] rounded-md mx-4 p-2'>

                <div className='flex flex-row border bg-slate-300 shadow-md rounded-md'>
                    <p className='text-lg font-semibold p-4 italic'>Map Settings</p>
                        <div className='flex flex-row text-lg font-semibold p-4 justify-end w-[80%] text-slate-800 space-x-4'>

                            <a onClick={handleAddOpen}>
                                <MdAddBox size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                            <a onClick={refreshTable}>
                                <MdRefresh size={30} className='hover:text-white drop-shadow-md'/>
                            </a>
                        </div>
                </div>
                <div className='border my-2 h-[85%] rounded-md bg-slate-100 drop-shadow-lg'>
                    { tableLoading ? (<div className='flex flex-col justify-center'><CircularProgress/></div>) : (
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

                <Modal
                open = {openEdit}
                onClose={handleEditClose}
                aria-labelledby="modal-window"
                aria-describedby="help-window">
                    <Box sx={big_modal_style}>
                        <SettingsModal row={selectedRow.row} handleClose={handleEditClose} refreshTable={refreshTable}/>
                    </Box>

                </Modal>
                <Modal
                open = {openAdd}
                onClose = {handleAddClose}
                aria-labelledby="modal-window"
                aria-describedby="help-window">
                    <Box sx={add_modal_style}>
                        <AddMapSettings handleClose={handleAddClose} refreshTable={refreshTable}/>
                    </Box>
                    
                </Modal>
        </div>
        <div className='w-[400px] h-[400px]'>
            <OnSiteMap/>
        </div>
    </div>
  )
}

export default MapSettings