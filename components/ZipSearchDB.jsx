import React, {useEffect, useState} from 'react'
import { Typography, Modal, Box, TextField, Button } from '@mui/material'
import { MdHelpCenter, MdAddBox, MdRefresh, MdFileCopy } from 'react-icons/md'
import {Loading} from "@nextui-org/react"
import { DataGrid } from '@mui/x-data-grid'
import {supabase} from "../supabase/supabase
import { isConstructorDeclaration } from 'typescript'



const ZipSearchDB = () => {

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

    const [urlTableLoading, setURLTableLoading] = useState(false);

    const [uModalOpen, setUModalOpen] = useState(false);
    const handleUModeOpen = () => setUModalOpen(true);
    const handleUModeClose = () => setUModalOpen(false);

    const [selectedRegion, setSelectedRegion] = useState("")

    const [addURLOpen, setURLOpen] = useState(false);
    const handleAddURLOpen = () => setURLOpen(true);
    const handleAddURLClose = () => setURLOpen(false);

    const cols = [
        {field: 'slug', headerName: 'slug', width: 120},
        {field: 'url', headerName:'URL', width: 400},
        {field: 'phone', headerName:'Phone', width: 500}
    ]
    const [rows, setRows] = useState([])

    const refreshURLTable = async () => {
        setURLTableLoading(true)
        const {data} = await supabase.from("slug_urls").select()
        setRows(data);
        setURLTableLoading(false)
    }

    useEffect(() => {

        const fetchURLS = async () => {
            const {data} = await supabase.from("slug_urls").select()
            setRows(data);
            console.log(data)
        }

        setURLTableLoading(true)
        //fetch data
        fetchURLS();

        setURLTableLoading(false)

    }, [])

    const updateURL = async () => {
        let value = document.getElementById("uModalURLInput").value
        let slug = selectedRegion.slug
        let phone = document.getElementById("uModalPhoneInput").value
        
        const {error} = await supabase.from("slug_urls").update({url: value, phone: phone}).eq('slug', slug)

        refreshURLTable()
        handleUModeClose()
    }

    const addURLSlug = async () => {
        let slug = document.getElementById("newSlug").value
        let url = document.getElementById("newURL").value
        let phone = document.getElementById("newPhone").value
        const {error} = await supabase.from("slug_urls").insert({slug: slug, url: url, phone: phone})

        refreshURLTable()
        handleAddURLClose()
    }

  return (
    <div className='h-full w-full bg-slate-900 rounded-md p-4 flex flex-col'>
        <div className="flex flex-row w-full space-x-5">
            <Typography variant='h4'>Zip Search DB</Typography>
            <Typography variant='p' color={"gray"}>(data source: "https://ydtalmcsutkxxlyoskoq.supabase.co")</Typography>
        </div>
        <div className='flex flex-row m-auto'>

            <div className='flex flex-row justify-center'>
                <div className=' h-[85vh] w-[80vh] bg-slate-600 rounded-md mx-4 p-2 shadow-md shadow-black'>

                    <div className='flex flex-row border bg-slate-200 shadow-md rounded-md'>
                        <p className='text-lg font-semibold p-2 italic text-black'>Zip Search Configs</p>
                            <div className='flex flex-row text-lg font-semibold p-4 justify-end w-[80%] text-slate-800 space-x-4'>
                                    {/* <MdHelpCenter size={30} className='hover:text-white drop-shadow-md'/> */}
                                    <MdAddBox size={30} onClick={handleAddURLOpen} className='hover:text-white drop-shadow-md'/>
                                    <a onClick={refreshURLTable}>
                                        <MdRefresh size={30} className='hover:text-white drop-shadow-md'/>
                                    </a>
                            </div>
                    </div>
                    
                        {urlTableLoading ? (<Loading className='p-20' size='xl'/>) : (
                        <div className='bg-white rounded-md my-2'>
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
                                        setSelectedRegion(e.row)
                                        handleUModeOpen()
                                    }}  
                                />
                        </div>)}

                        <Modal
                            open={uModalOpen}
                            onClose={handleUModeClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box style={modalStyle}>
                                <div className='flex flex-col space-y-2 justify-center bg-white p-8'>
                                    <Typography variant='h4'>Edit URL</Typography>
                                    <Typography variant='h6'>Slug: {selectedRegion.slug}</Typography>
                                    <p><strong>Current URL:</strong> {selectedRegion.url}</p>
                                    <a className='hover:cursor-pointer w-20' onClick={() => {
                                       navigator.clipboard.writeText(selectedRegion.url); 
                                    }}><MdFileCopy/></a>
                                    <p>Current Phone: {selectedRegion.phone}</p>
                                    <a className='hover:cursor-pointer w-20 pb-2' onClick={() => {
                                        navigator.clipboard.writeText(selectedRegion.phone);
                                    }}><MdFileCopy/></a>
                                    <TextField label="New URL" id='uModalURLInput'/>
                                    <TextField label="New Phone" id='uModalPhoneInput'/>
                                    <Button variant='contained' onClick={updateURL}>Save</Button>
                                </div>
                            </Box>


                        </Modal>

                        <Modal
                            open={addURLOpen}
                            onClose={handleAddURLClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box style={modalStyle}>
                                <div className='flex flex-col space-y-2 justify-center bg-white p-2'>
                                    <Typography variant='h4'>Add Slug/URL </Typography>
                                    <TextField label="Slug" id='newSlug'/>
                                    <TextField label="URL" id='newURL'/>
                                    <TextField label="Phone" id='newPhone'/>
                                    <Button variant='contained' onClick={addURLSlug} color='success'>Add</Button>
                                    <p>https://affordabledumpsterrental.com/</p>
                                    
                                </div>
                            </Box>
                        </Modal>
                    
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default ZipSearchDB