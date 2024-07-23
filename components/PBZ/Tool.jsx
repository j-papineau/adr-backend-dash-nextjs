'use client'
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {supabase} from "/supabase/supabase.js"
import { Button, CircularProgress, Divider, TextField, Typography } from '@mui/material'
import L from 'leaflet'
import newIconURL from "../../public/images/markerImage.png"
import { GoXCircleFill, GoCheckCircleFill } from "react-icons/go";
import SizeDisplay from './SizeDisplay'




const Tool = () => {

    const newIcon = new L.Icon({
        iconUrl: newIconURL
    })

    const [jsonLoading, setJsonLoading] = useState(true);
    const [json, setJson] = useState({});

    const [markerPos, setMarkerPos] = useState(null);
    const [mapZoom, setMapZoom] = useState(5);
    const [mapCenter, setMapCenter] = useState([40,-74])

    const [map, setMap] = useState(null);

    const [selectedPoly, setSelectedPoly] = useState(null);

    const [currentRegion, setCurrentRegion] = useState(null);


    function blobToJson(blob){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (event) {
                try{
                    const json = JSON.parse(event.target.result);
                    resolve(json);
                } catch(e){
                    reject(e);
                }
            };

            reader.onerror = function(event) {
                reject(new Error('FileReader error' + event.target.error.code));
            };

            reader.readAsText(blob)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase.storage.from("pricing-by-zip").download("PBZmap.geojson")
            let newJSON = await blobToJson(data);
            console.log(newJSON)
            setJson(newJSON);
            setJsonLoading(false);
        }
        setJsonLoading(true);
        fetchData();
    }, [])

    const searchZip = async () => {
        let inputValue = document.getElementById("zipInput").value
        inputValue = Number(inputValue)
        console.log(inputValue)
        //get lat lng from supabase
        const {data, error} = await supabase.from('all_zips').select().eq('zip', inputValue)
        console.log(data)
        if(data.length > 0){
            let lat = data[0].lat;
            let lng = data[0].lng;
            setMarkerPos([lat,lng]);
            map.setView([lat, lng], 10);
            checkPip([lat,lng]);
        }else{
            alert("unable to find that zip code :(")
        }
        

    }

    const getRegionInfo = async (regionID) => {
        setCurrentRegion(null);
        //get info from sb
        console.log("getting info for region: " + regionID);

        const {data, error} = await supabase.from("region_info").select().eq('regionID', regionID);

        setCurrentRegion(data[0]);

    }

    const checkPip = async (checkPos) => {
        for (let feature of json.features){
            if(feature.geometry.type === 'Polygon'){
                const polygon = L.geoJSON(feature);
                if(polygon.getBounds().contains(checkPos)){
                    await getRegionInfo(feature.properties.regionID);
                    setSelectedPoly(feature);
                    console.log("Found poly");
                    console.log(feature);
                    return;
                }else{
                    setSelectedPoly(null)
                }
            }
        }
    }

  return (
    <div className='flex flex-col space-y-4'>
        {jsonLoading ? (<CircularProgress/>) : (
            <>
                <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> 
                {(markerPos == null) ? (<></>) : (
                    <Marker icon={newIcon} position={markerPos}>

                    </Marker>
                )}
                <GeoJSON data={json}/> 
                </MapContainer>

                <div className='flex flex-col space-y-2'>
                    <Typography variant='h5'>Search by zip</Typography>
                    <div className='flex flex-row w-[50%] space-x-2'>
                        <TextField id='zipInput'></TextField>
                        <Button variant='contained' onClick={searchZip}>Search</Button>
                    </div>
                </div>
            </>
        )}
        {(selectedPoly != null) ? (
        <>
            <div className='bg-slate-200 rounded-md p-2 flex flex-col space-y-2'>
                <h5 className='font-semibold underline'>Pricing Information</h5>
                <p><strong>RegionID:</strong> {selectedPoly.properties.regionID} </p>
                <div className='flex flex-row space-x-3'>
                    <div className='flex flex-col align-bottom'>
                        <p>10s</p>
                        {(selectedPoly.properties["10s"] == 'yes') ? (<GoCheckCircleFill color='green'/>) : (<GoXCircleFill color='red'/>)}
                    </div>
                    <div className='flex flex-col align-bottom'>
                        <p>15s</p>
                        {(selectedPoly.properties["15s"] == 'yes') ? (<GoCheckCircleFill color='green'/>) : (<GoXCircleFill color='red'/>)}
                    </div>
                    <div className='flex flex-col align-bottom'>
                        <p>20s</p>
                        {(selectedPoly.properties["20s"] == "yes") ? (<GoCheckCircleFill color='green'/>) : (<GoXCircleFill color='red'/>)}
                    </div>
                    <div className='flex flex-col align-bottom'>
                        <p>30s</p>
                        {(selectedPoly.properties["30s"] == "yes") ? (<GoCheckCircleFill color='green'/>) : (<GoXCircleFill color='red'/>)}
                    </div>
                    <div className='flex flex-col align-bottom'>
                        <p>40s</p>
                        {(selectedPoly.properties["40s"] == "yes") ? (<GoCheckCircleFill color='green'/>) : (<GoXCircleFill color='red'/>)}
                    </div>
                </div>



                <Divider/>

                <SizeDisplay
                title={"10s"}
                basePrice={currentRegion["10_price"]}
                baseWeight={currentRegion["10_weight"]}
                perThou={currentRegion["10_per_thou"]}
                priceMod={selectedPoly.properties["10_add"]}
                />
                <SizeDisplay
                title={"15s"}
                basePrice={currentRegion["15_price"]}
                baseWeight={currentRegion["15_weight"]}
                perThou={currentRegion["15_per_thou"]}
                priceMod={selectedPoly.properties["15_add"]}
                />
                <SizeDisplay
                title={"20s"}
                basePrice={currentRegion["20_price"]}
                baseWeight={currentRegion["20_weight"]}
                perThou={currentRegion["20_per_thou"]}
                priceMod={selectedPoly.properties["20_add"]}
                />
                <SizeDisplay
                title={"30s"}
                basePrice={currentRegion["30_price"]}
                baseWeight={currentRegion["30_weight"]}
                perThou={currentRegion["30_per_thou"]}
                priceMod={selectedPoly.properties["30_add"]}
                />
                <SizeDisplay
                title={"40s"}
                basePrice={currentRegion["40_price"]}
                baseWeight={currentRegion["40_weight"]}
                perThou={currentRegion["40_per_thou"]}
                priceMod={selectedPoly.properties["40_add"]}
                />

                <div className='flex flex-col'>
                    <Typography variant='h5'>Days</Typography>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                        <div className='bg-slate-300 rounded-md p-4 text-center'>
                            <Typography variant='p'>Days Allowed</Typography>
                            <Typography variant='h6'>{currentRegion["days_allowed"]}</Typography>
                        </div>
                        <div className='bg-slate-300 rounded-md p-4 text-center'>
                            <Typography variant='p'>Extra Day</Typography>
                            <Typography variant='h6'>${currentRegion["extra_day"]}</Typography>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <Typography variant='h5'>Info From CRM</Typography>
                    <TextField value={currentRegion["pbz_note"]}
                        multiline
                        InputLabelProps={{ shrink: true }}
                        label="CRM info"
                        rows={10}
                        fullWidth
                        disabled={true}
                    />
                </div>



                {/* <p><strong>10</strong>: ${currentRegion["10_price"] + selectedPoly.properties["10_add"]}</p>
                <p><strong>15</strong>: ${currentRegion["15_price"] + selectedPoly.properties["15_add"]}</p>
                <p><strong>20</strong>: ${currentRegion["20_price"] + selectedPoly.properties["20_add"]}</p>
                <p><strong>30</strong>: ${currentRegion["30_price"] + selectedPoly.properties["30_add"]}</p>
                <p><strong>40</strong>: ${currentRegion["40_price"] + selectedPoly.properties["40_add"]}</p>
                <p><strong>days:</strong> {currentRegion["days_allowed"]}</p>
                <p><strong>extra day:</strong> {currentRegion["extra_day"]} </p> */}
                
                {/* <p><strong>concrete?</strong> {selectedPoly.properties.concrete} </p> */}
            </div>
        </>) : (<></>)}
        

    </div>
  )
}

export default Tool