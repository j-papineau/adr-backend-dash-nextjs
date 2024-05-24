import React, { useEffect, useState} from 'react'
import {supabase} from "supabase/supabase"
import { Typography, Modal, Box, TextField, Button, Input } from '@mui/material'
import { MdHelpCenter, MdAddBox, MdRefresh, MdFileCopy } from 'react-icons/md'
import {Loading} from "@nextui-org/react"
import { DataGrid } from '@mui/x-data-grid'

const ListView = () => {
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

    const [regionTableLoading, setRegionTableLoading] = useState(true);
    const [addmodalOpen, setAddModalOpen] = useState(false);
    const handleAddModalOpen = () => setAddModalOpen(true);
    const handleAddModalClose = () => setAddModalOpen(false);
    const [rows, setRows] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const handleUpdateModalOpen = () => setUpdateModalOpen(true);
    const handleUpdateModalClose = () => setUpdateModalOpen(false);

    const cols = [
        {field: 'regionID', headerName: 'regionID', width: 120},
        {field: 'phone', headerName: 'Phone', width: 120},
        {field: 'name', headerName: 'Name', width: 120},
        {field: 'thankyoupage_text', headerName: 'Header Text', width: 240}

    ]

    const refreshRegionTable = async () => {
        setRegionTableLoading(true);
        const {data} = await supabase.from("region_info").select();
        setRows(data);
        setRegionTableLoading(false);
    }

    useEffect(() => {

        const fetchRegions = async () => {
            const {data} = await supabase.from("region_info").select();
            setRows(data);
            console.log(data);
        }

        setRegionTableLoading(true);
        fetchRegions();
        setRegionTableLoading(false);
    }, [])

    const handleRegionIDChange = (e) => {
        setSelectedRegion((prevSelectedRegion) => ({
            ...prevSelectedRegion, 
            regionID: parseInt(e.target.value)
        }));
    }

    const handleRegionPhoneChange = (e) => {
        setSelectedRegion((prevSelectedRegion) => ({
            ...prevSelectedRegion,
            phone: e.target.value
        }))
    }

    const handleRegionNameChange = (e) => {
        setSelectedRegion((prevSelectedRegion) => ({
            ...prevSelectedRegion,
            name: e.target.value
        }))
    }

    const handleRegionUpdate = async (e) => {
        const { error } = await supabase.from("region_info").update(selectedRegion).eq('id', selectedRegion.id)
        console.log(error);
        refreshRegionTable();
        setUpdateModalOpen(false);
        console.log("region updated")
    }

    const handleRegionAdd = async () => {
        const {error} = await supabase.from("region_info").insert(
            {
                regionID: newRegionID,
                phone: newRegionPhone,
                name: newRegionName
            }
        )
        refreshRegionTable();
        setAddModalOpen(false);
        console.log("region added")
    }

    const [newRegionID, setNewRegionID] = useState();
    const [newRegionPhone, setNewRegionPhone] = useState();
    const [newRegionName, setNewRegionName] = useState();

    const handleRegionDelete = async () => {
        const {error} = await supabase.from("region_info").delete().eq('id', selectedRegion.id);
        refreshRegionTable();
        setUpdateModalOpen(false);
        console.log("region deleted");
    }

    

    useEffect(() => {

    })
  return (
    <div className='h-full w-full rounded-md p-4 flex flex-col'>
        <div className='flex flex-row w-full space-x-5 my-5 text-slate-400'>
            <Typography variant='h4'>Region Info</Typography>
        </div>
        <div className='flex flex-row m-auto '>
            <div className='flex flex-row justify-center'>
                <div className=' h-[85vh] w-[80vh] rounded-md mx-4 p-2 shadow-md shadow-black bg-white'>
                    <div className='flex flex-row border bg-slate-200 shadow-md rounded-md'>
                        <p className='text-lg font-semibold p-2 italic text-black'>Thank you page config </p>
                        <div className='flex flex-row text-lg font-semibold p-4 justify-end w-[80%] text-slate-800 space-x-4'>
                                <MdAddBox size={30} onClick={handleAddModalOpen} className='hover:text-white drop-shadow-md'/>
                                <a onClick={refreshRegionTable}>
                                    <MdRefresh size={30} className='hover:text-white drop-shadow-md'/>
                                </a>
                            </div>
                        </div>

                    {regionTableLoading ? (<Loading className='p-20' size='xl'/>) : (
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
                        pageSizeOptions={[5,10,15]}
                        onRowClick={(e) => {
                            setSelectedRegion(e.row);
                            handleUpdateModalOpen();
                        }}
                        />
                    )}


                    </div>
                    {!updateModalOpen ? (<></>) : (
                        <>
                        <Modal 
                        open={updateModalOpen}
                        onClose={handleUpdateModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box style={modalStyle}>
                            <div className='flex flex-col space-y-2 justify-center bg-slate-100 p-8'>
                                <Typography variant='h4'>Edit Region</Typography> 
                                <TextField label='regionID' 
                                value={selectedRegion.regionID}
                                onChange={handleRegionIDChange}
                                /> 
                                <TextField label='phone'
                                value={selectedRegion.phone}
                                onChange={handleRegionPhoneChange}
                                />
                                <TextField label='name'
                                value={selectedRegion.name}
                                onChange={handleRegionNameChange}
                                />

                                <Button
                                color='primary'
                                variant='contained'
                                onClick={handleRegionUpdate}>
                                    Apply
                                 </Button>

                                <Button
                                color='error'
                                variant='contained'
                                onClick={handleRegionDelete}>
                                    Delete Region    
                                </Button>  
                            </div>
                        </Box>
                        </Modal>
                        </>
                    )}

                    {!addmodalOpen ? (<></>) : (
                        <>
                            <Modal
                            open={addmodalOpen}
                            onClose={handleAddModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box style={modalStyle}>
                                <div className='flex flex-col space-y-2 justify-center bg-slate-100 p-8'>
                                    <Typography variant='h4'>Add Region</Typography> 
                                    <TextField label='regionID' value={newRegionID} onChange={(e) => {setNewRegionID(parseInt(e.target.value))}}/>
                                    <TextField label='phone' value={newRegionPhone} onChange={(e) => {setNewRegionPhone(e.target.value)}}/>
                                    <TextField label='name' value={newRegionName} onChange={(e) => {setNewRegionName(e.target.value)}}/>
                                    <Button
                                    variant='contained'
                                    color='success'
                                    onClick={handleRegionAdd}>
                                        Add Region
                                    </Button>
                                </div>
                            </Box>
                            </Modal>
                        </>
                    )}
                    
            </div>
        </div>
    </div>
  )
}

export default ListView