'use client'
import React, {useState} from 'react'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {supabase} from "/supabase/supabase.js"
import { Button, CircularProgress, Divider, TextField, Typography } from '@mui/material'
import L from 'leaflet'
import {allZipPolygons} from "../../data/all_zip_polys"

const PolyFromZips = () => {
    const newIcon = new L.Icon({
        iconUrl: "/images/marker-icon.png"
    })

    const [markerPos, setMarkerPos] = useState(null);
    const [mapZoom, setMapZoom] = useState(5);
    const [mapCenter, setMapCenter] = useState([40,-74])

    const [map, setMap] = useState(null);

    const [inputVal, setInputVal] = useState("");


    const createPoly = async () => {
        console.log("creating poly from selected zips")
        console.log(inputVal);
        if(inputVal == ""){
            alert("invalid input");
            return;
        }
        
        let zips = inputVal.split(',');
        for(let i = 0; i < zips.length; i++){
            let newZip = zips[i].trim();
            zips[i] = newZip;
        }

        getLatLngs(zips);

    }

    const getLatLngs = async (zips) => {
        console.log(zips);
        console.log(allZipPolygons);
    }

  return (

    <div className='h-[150vh] flex flex-col space-y-4'>
        <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        </MapContainer>

        <div className='flex flex-col space-x-2 space-y-2'>
            <TextField label="zips (comma seperated)" value={inputVal}
            multiline
            minRows={10}
            maxRows={10} 
            onChange={(e) => {
                setInputVal(e.target.value);
            }} />

            <Button variant={(inputVal == "") ? ('outlined') : ('contained')} onClick={createPoly}>Draw Region</Button>
            <Button variant='outlined' color='secondary'>Export Polygon as GeoJSON</Button>
        </div>
        


    </div>
  )
}

export default PolyFromZips