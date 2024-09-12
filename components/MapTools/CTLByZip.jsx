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

    const [finalMapData, setFinalMapData] = useState(null);

    const [colorCodeMode, setColorCodeMode] = useState("CPL");


    const cols = [
        {field: 'id', headerName: 'ID', hide: true},
        {field: 'zip', headerName: 'Zip', width: 120,},
        {field: 'ctl', headerName: 'CTL', width: 120},
        {field: 'cpl', headerName: 'CPL'},
    ]

    const flattenData = (data) => {
        return data.map((item, index) => ({
            id: index + 1,
            zip: item["Matched location"],
            ctl: item["CTL"],
            cpl: item["CPL"],
            center: item["center"]
        }))
    }


    const processData = () => {
        //trim zip codes from matched location
        
        let trimmed = GBZ.trimZips(gadData);
        let acc = CBZ.countZipOccurences(crmData);
        let joined = GBZ.joinLeadstoGad(acc, trimmed, colorCodeMode)
        //join acc (leads by zip) to gad data
        //get big sums
        setFinalMapData(joined);
        console.log(joined)
        setFlattenedData(flattenData(joined))
        console.log(flattenedData)
        setisMapShowing(true);

        
    }


    return (
        <div className='h-[200vh] flex flex-col space-y-4'>
            <div className='flex flex-row space-x-4 items-end'>
            
                <div className='flex flex-col'>
                    <Typography variant='h6'>CRM List</Typography>
                    <TextField type='file' onChange={(e) => {
                        console.log("crm file")
                        fh.handleXLSXUpload(e, setCrmData);
                    }}/>
                </div>

                <div className='flex flex-col'>
                    <Typography variant='h6'>GAD Data</Typography>
                    <p className='text-xs'>(remove generated rows and export as xlsx)</p>
                    <TextField type='file' onChange={(e) => {
                        fh.handleXLSXUpload(e, setGadData);
                    }}/>
                </div>
   
            </div>

            <div className='flex flex-row space-x-4 items-center'>
                <div className='flex flex-col'>
                    <Typography variant='h6'>Sales Data</Typography>
                    <TextField disabled type='file' onChange={(e) => {
                        fh.handleXLSXUpload(e, setGadData);
                    }}/>
                </div>
            </div>
            <div className='flex flex-col space-x-4 items-center'>

                 <Button size={'large'} disabled={(crmData == null || gadData == null)} variant='contained' onClick={processData}>Process</Button>
            </div>

            <div className='flex flex-col p-2 items-center'>

                {(!isMapShowing) ? (<></>) : (
                    <>
                        <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{height: 600, width: "100%"}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />  

                        {
                            finalMapData.map((item) => {
                                if(item.geometry && item.geometry.coordinates && Array.isArray(item.geometry.coordinates)){
                                    return (
                                        <Polygon key={item["Matched location"]}
                                        positions={item.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
                                        pathOptions={{color: item.color_code, weight: 2, fillOpacity:.3}}
                                        eventHanders={{
                                            click: () => console.log(item)
                                        }}
                                        >
                                            <Popup>
                                                <div>
                                                    <h1 className='text-xl'><strong>{item["Matched location"]}</strong></h1>
                                                    <p><strong>CPL: </strong>{Math.round(item.CPL)}</p>
                                                    <p><strong>CPC: </strong>{item["Avg. CPC"]}</p>
                                                    <p><strong>CTL: </strong>{item["CTL"]}</p>
                                                    <p><strong>Clicks: </strong>{item["Clicks"]}</p>
                                                    <p><strong>Leads: </strong>{item["Leads"]}</p>
                                                    <p><strong>Cost: </strong>{item["Cost"]}</p>
                                                </div>
                                                
                                            </Popup>

                                        </Polygon>
                                    )
                                }
                            })
                        }

                        </MapContainer>

                        <FormControl sx={{m: 1, width: 200}}>
                            <InputLabel id="select-label">Color Code Based On</InputLabel>
                            <Select
                                    
                                    labelId='select-label'
                                    fullWidth
                                    value={colorCodeMode}
                                    label="Color Coding"
                                    onChange={(e) => {
                                        setColorCodeMode(e.target.value)
                                        if(isMapShowing){
                                            processData()
                                        }}}
                                    MenuProps={MenuProps}
                                    input={<OutlinedInput label="tag" />}>
                                        
                                        <MenuItem value={"CTL"} key={1}>
                                            <ListItemText primary={"Click to Lead"}/>
                                        </MenuItem>
                                        <MenuItem value={"CPL"} key={2}>
                                            <ListItemText primary={"Cost Per Lead"}/>
                                        </MenuItem>

                            </Select>
                        </FormControl>

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