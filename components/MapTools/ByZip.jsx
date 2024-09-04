'use client'
import React, {useEffect, useState} from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polygon, GeoJSON as leafletGeoJson } from 'react-leaflet'
import { Button, CircularProgress, Divider, TextField, Typography, Select, Input, MenuItem, FormControl, InputLabel, ListItemText, OutlinedInput} from '@mui/material'
import L from 'leaflet'
import {allZipPolygons} from "../../data/all_zip_polys"
import {supabase} from "/supabase/supabase.js"
import { testFunc } from './ClosingByZip'
import { readCSVtoJSON } from '../../lib/FileHelpers'

const ByZip = () => {

    const [map, setMap] = useState(null);
    const [mapZoom, setMapZoom] = useState(5);
    const [mapCenter, setMapCenter] = useState([40,-74])

    const [isMapShowing, setisMapShowing] = useState(false);

    const [quotedFile, setQuotedFile] = useState(null);
    const [soldFile, setSoldFile] = useState(null);
    const [regions, setRegions] = useState({});
    const [regionsLoaded, setRegionsLoaded] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);

    useEffect(() => {

        const getRegions = async () => {
            const {data, error} = await supabase.from("region_info").select("regionID, name");

            //sort regions alphabetically
            
            setRegions(data);
            setRegionsLoaded(true);
            
        }

        getRegions();


    }, [])

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

    const runProcess = () => {

        console.log(e.target.files[0]);
        
    }

    
  return (
    
    <div className='h=[150vh] flex flex-col space-y-4'>
        <div className='flex flex-row space-x-4'>
            <div className='flex flex-col p-2'>
                <Typography variant='h6'>Customer List (sold)</Typography>
                <Input value={soldFile} type='file' onChange={(e) => {
                    setSoldFile(e.target.files[0]);
                    
                }} />
            </div>
            <div className='flex flex-col p-2'>
                <Typography variant='h6'>Customer List (quoted)</Typography>
                <Input value={quotedFile} type='file' onChange={(e) => {
                    setQuotedFile(e.target.files[0]);

                }}/>
            </div>
            <div className='flex flex-col p-2 items-center space-y-2'>
                {regionsLoaded ? (<>
                <FormControl sx={{m: 1, width: 200}}>
                    <InputLabel id="select-label">Region</InputLabel>
                    <Select
                        labelId='select-label'
                        value={selectedRegion}
                        label="Region"
                        onChange={(e) => {setSelectedRegion(e.target.value)}}
                        MenuProps={MenuProps}
                        input={<OutlinedInput label="tag" />}>

                        {regions.map((region, key) => (
                            
                            <MenuItem value={region.regionID} key={key}>
                                <ListItemText primary={region.name}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                </>) : (<CircularProgress size={30}/>)}

                <Button disabled={(quotedFile == null | soldFile == null | selectedRegion == null)} variant='contained'>Process</Button>
            </div>
        </div>
        
        {(!isMapShowing) ? (<></>) : (
            <>
            <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={false} style={{height: 600, width: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />  
            </MapContainer>
            </>
        )}
        
    </div>
  )
}

export default ByZip