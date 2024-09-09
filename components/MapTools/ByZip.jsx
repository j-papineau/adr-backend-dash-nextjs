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


const ByZip = () => {

    const [map, setMap] = useState(null);
    const [mapZoom, setMapZoom] = useState(5);
    const [mapCenter, setMapCenter] = useState([40,-74])

    const [isMapShowing, setisMapShowing] = useState(false);

    const [quotedFileData, setQuotedFileData] = useState(null);
    const [soldFileData, setSoldFileData] = useState(null);
    const [regions, setRegions] = useState({});
    const [regionsLoaded, setRegionsLoaded] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    const [quotedFileFinal, setQuotedFileFinal] = useState(null);
    const [soldFileFinal, setSoldFileFinal] = useState(null);
    const [finalPolygons, setFinalPolygons] = useState({});


    useEffect(() => {

        setRegionsLoaded(false);

    }, [])

    useEffect(() => {

        if(quotedFileData === null || soldFileData === null){
            console.log("one or more files is null");
            return;
        }else{
            setIsProcessing(true);
            //get region list
            var lookup = {};
            var items = soldFileData;
            var result = [];
            for (var item, i=0; item = items[i++];){
                var regionName = item["Region Name"];
                if(!(regionName in lookup)){
                    lookup[regionName] = 1;
                    result.push(regionName);
                }
            }
            
            setRegions(result);
            setRegionsLoaded(true);

            setIsProcessing(false);

        }

    }, [soldFileData, quotedFileData])

    
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
        setisMapShowing(false);
        setIsProcessing(true);

        if(quotedFileData === null || soldFileData === null){
            alert("file error.");
            return;
        }

        // filter out by region
        var soldFiltered = soldFileData.filter((entry) => {
            return entry["Region Name"] === selectedRegion;
        })

        var quotedFiltered = quotedFileData.filter((entry) => {
            return entry["Region Name"] === selectedRegion;
        })


        //get unique zips from quoted filtered
        let soldZips = CBZ.getUniqueZips(soldFiltered);
        let quotedZips = CBZ.getUniqueZips(quotedFiltered);
        let finalZips = (soldZips.length > quotedZips) ? soldZips : quotedZips;
        
        // CBZ.convertExcelDatesToSanePersonDates(soldFiltered);

        let closingFinalByZip = CBZ.getClosingByZip(finalZips, soldFiltered, quotedFiltered);

        let polygonsWithClosing = CBZ.getPolygonGeometries(closingFinalByZip);
        setFinalPolygons(polygonsWithClosing);
        console.log(polygonsWithClosing);

        setIsProcessing(false);
        setisMapShowing(true);

    }

    

    
  return (
    
    <div className='h=[150vh] flex flex-col space-y-4'>
        <div className='flex flex-row space-x-4'>
            <div className='flex flex-col p-2'>
                <Typography variant='h6'>Customer List (sold)</Typography>
                <TextField type='file' onChange={(e) => {
                    fh.handleXLSXUpload(e, setSoldFileData);
                }}/>

                <Typography variant='h6'>Customer List (quoted)</Typography>
                <TextField type='file' onChange={(e) => {
                    fh.handleXLSXUpload(e, setQuotedFileData);
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
                            
                            <MenuItem value={region} key={key}>
                                <ListItemText primary={region}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                </>) : (<></>)}

                <Button size={'large'} disabled={(quotedFileData == null | soldFileData == null | selectedRegion == null)} variant='contained' onClick={runProcess}>Process</Button>
                {isProcessing ? (<CircularProgress color='secondary'/>) : (<></>)}
            </div>
        </div>
        
        {(!isMapShowing) ? (<></>) : (
            <>
            <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{height: 600, width: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    
                    finalPolygons.map((polygon) => {

                        if( polygon.geometry && polygon.geometry.coordinates && Array.isArray(polygon.geometry.coordinates[0])){
                            return (
                                <Polygon key={polygon.zipCode} 
                            positions={polygon.geometry.coordinates[0].map(coord => [coord[1], coord[0]])} 
                            pathOptions={{ color: polygon.color, weight: 2, fillOpacity: 0.5 }}
                            eventHandlers={{
                                click: () => console.log(polygon.zipCode),
                            }}
                            />
                            )
                        }
                    })
                    
                }
            </MapContainer>
            </>
        )}
        
    </div>
  )
}

export default ByZip