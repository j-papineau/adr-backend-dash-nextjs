'use client'
import React, { useEffect, useState } from 'react'
import { Typography, Divider, CircularProgress, TextField, Button, Checkbox } from '@mui/material'
import {supabase} from "/supabase/supabase.js"
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMapEvents, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import PolygonCheckbox from './PolygonCheckbox'



const PolygonEditor = () => {

    

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

    const [json, setJson] = useState({});
    const [jsonLoading, setJsonLoading] = useState(true);
    const [map, setMap] = useState(null);

    const [selectedPoly, setSelectedPoly] = useState(null);

    const [currLat, setCurrLat] = useState(0);
    const [currLng, setCurrLng] = useState(0);

    function ClickHandler() {
        const map = useMapEvents({
            click: (e) => {
                console.log("map clicked");
                console.log(e);
                newClickOccured(e.latlng.lat, e.latlng.lng);
            }
        })
        return null;
    }


    useEffect(() => {

        const fetchData = async() => {
            const {data, error} = await supabase.storage.from("pricing-by-zip").download("PBZmap.geojson");
            let newJSON = await blobToJson(data);
            setJson(newJSON);
            setJsonLoading(false);
        }

        setJsonLoading(true);
        fetchData();


    }, [])

    const newClickOccured = (lat, lng) => {
        console.log(lat, lng)
        checkPip([lat, lng])
        if(selectedPoly == null){
            return;
        }
        //change style

    }

    const checkPip = async (checkPos) => {
        for (let feature of json.features){
            if(feature.geometry.type === 'Polygon'){
                const polygon = L.geoJSON(feature);
                if(polygon.getBounds().contains(checkPos)){
                    setSelectedPoly(feature)
                    console.log(feature)
                    return;
                }else{
                    setSelectedPoly(null);
                }
            }
        }
    }

    const clickedStyle = {
        color: 'green',
        weight: 2,
        fillColor: 'lightgreen',
        fillOpacity: 0.5,
    };

    const updateMap = async () => {
        console.log(selectedPoly);
    }


  return (
    <div className='flex flex-col space-y-4'>
        <Typography variant='h5'>Edit Map</Typography>
        <Divider></Divider>
        <div>
            {jsonLoading ? (<CircularProgress/>) : (
                <>
                    <MapContainer ref={setMap} center={[40, -74]} zoom={5} scrollWheelZoom={true} style={{height:600, width: "100%"}}
                    
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        /> 
                    <GeoJSON data={json}/>
                    <ClickHandler/>
                    {(selectedPoly == null) ? (<></>) : (
                        <GeoJSON data={selectedPoly} style={clickedStyle}/>
                    )}
                    </MapContainer>
                </>
            )}
        </div>

        <div className='flex flex-col space-y-4'>
            <Typography variant='h5'>Selected Region</Typography>
            <Divider></Divider>
            {(selectedPoly == null) ? (<></>) : (<>
                <p>RegionId: {selectedPoly.properties.regionID}</p>
                <div className='flex flex-row space-x-2'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold'>10s</p>
                        <Checkbox checked={(selectedPoly.properties["10s"] == "yes")} onChange={(e) => {
                            console.log(e.target.checked)
                            if(e.target.checked){
                                selectedPoly.properties["10s"] = "yes"
                            }else{
                                selectedPoly.properties["10s"] = "no"
                            }
                        }}/>
                        {/* <PolygonCheckbox selectedPoly={selectedPoly} attribute={"10s"} /> */}
                    </div>

                </div>
                <div className='flex flex-row space-x-2'>
                    <TextField 
                        type='number'
                        value={selectedPoly.properties["10_add"]}
                        InputLabelProps={{shrink: true}}
                        label={"10 Add"}
                        onChange={(e) => {
                            selectedPoly.properties["10_add"] = Number(e.target.value);
                        }}
                    />
                    <TextField 
                    type='number'
                    value={selectedPoly.properties["15_add"]}
                    InputLabelProps={{shrink: true}}
                    label={"15 Add"}
                    onChange={(e) => {
                        selectedPoly.properties["15_add"] = Number(e.target.value);
                    }}
                />

                </div>
                
                <Button variant="contained" onClick={updateMap}>Apply Changes</Button>
            
            </>)}
        </div>


    </div>
  )
}

export default PolygonEditor