'use client'
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {supabase} from "/supabase/supabase.js"
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import L from 'leaflet'
import newIconURL from "../../public/images/markerImage.png"



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

    const checkPip = (checkPos) => {
        for (let feature of json.features){
            if(feature.geometry.type === 'Polygon'){
                const polygon = L.geoJSON(feature);
                if(polygon.getBounds().contains(checkPos)){
                    setSelectedPoly(feature);
                    console.log("Found poly");
                    console.log(feature);
                    return;
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
                <p className='font-semibold'>Pricing Information</p>
                <p><strong>RegionID:</strong> {selectedPoly.properties.regionID} </p>
                <p><strong>Add $:</strong> {selectedPoly.properties.Price_Modifier} </p>
                <p><strong>Extra Day:</strong> {selectedPoly.properties.extra_day} </p>
                <p><strong>concrete?</strong> {selectedPoly.properties.concrete} </p>
            </div>
        </>) : (<></>)}
        

    </div>
  )
}

export default Tool