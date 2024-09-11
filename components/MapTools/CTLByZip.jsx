'use client'
import React, {useEffect, useState} from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polygon, GeoJSON as leafletGeoJson } from 'react-leaflet'
import { Button, CircularProgress, Divider, TextField, Typography, Select, Input, MenuItem, FormControl, InputLabel, ListItemText, OutlinedInput} from '@mui/material'
import L from 'leaflet'
import {allZipPolygons} from "../../data/all_zip_polys"
import {supabase} from "/supabase/supabase.js"
import * as CBZ from '../../lib/ClosingByZip'
import * as fh from '../../lib/FileHelpers'
import * as xlsx from 'xlsx'
import * as GBZ from "../../lib/GADByZip"
import { DataGrid } from '@mui/x-data-grid'


const CTLByZip = () => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };


    const [crmData, setCrmData] = useState(null);
    const [gadData, setGadData] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [regions, setRegions] = useState({})
    const [regionsLoaded, setRegionsLoaded] = useState(false);
    const [isMapShowing, setisMapShowing] = useState(false);

    const [map, setMap] = useState(null);
    const [mapZoom, setMapZoom] = useState(5);
    const [mapCenter, setMapCenter] = useState([40,-74])

    const [flattenedData, setFlattenedData] = useState(null);


    const cols = [
        {field: 'id', headerName: 'ID', hide: true},
        {field: 'zip', headerName: 'Zip', width: 120,},
        {field: 'closingRate', headerName: 'Closing Rate', width: 120},
        {field: 'quotedCount', headerName: 'Quoted'},
        {field: 'soldCount', headerName: 'Sold'}
    ]

    const flattenData = (data) => {
        return data.map((item, index) => ({
            id: index + 1,
            zip: item.info.zip,
            closingRate: item.info.closingRate,
            quotedCount: item.info.quotedCount,
            soldCount: item.info.soldCount,
            center: item.centerOfMass
        }))
    }

    const processData = () => {
        //trim zip codes from matched location
        GBZ.trimZips(gadData);
        let acc = CBZ.countZipOccurences(crmData);
        console.log(acc)

        
    }


    return (
        <div className='h-[150vh] flex flex-col space-y-4'>
            <div className='flex flex-row space-x-4 items-center'>
            <Typography variant='h6'>CRM List</Typography>
                <TextField type='file' onChange={(e) => {
                    console.log("crm file")
                    fh.handleXLSXUpload(e, setCrmData);
                }}/>

                <Typography variant='h6'>GAD Data</Typography>
                <p>(remove generated rows and export as xlsx)</p>
                <TextField type='file' onChange={(e) => {
                    fh.handleXLSXUpload(e, setGadData);
                }}/>   
            </div>
            <div className='flex flex-row space-x-4 items-center'>

                <Button onClick={processData} disabled={crmData == null | gadData == null} variant='contained' size='large' >Process</Button>
            
            </div>

            <div className='flex flex-col p-2 items-center'>

                {(!isMapShowing) ? (<></>) : (
                    <>
                        <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{height: 600, width: "100%"}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />  

                        </MapContainer>

                        <div className='flex flex-col'>
                        <DataGrid
                            rows={flattenedData}
                            columns={cols}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                    pageSize: 10,
                                    },
                                },
                                }}
                                pageSizeOptions={[5,10]}
                                //onRowClick flash polygon
                                onRowClick={(e) => {
                                    console.log(e.row.center);
                                    map.flyTo([e.row.center[1], e.row.center[0]], 13);
                                }}
                            />
                        </div>
                    
                    </>
                    
                )}
            </div>
        </div>
    )
}

export default CTLByZip