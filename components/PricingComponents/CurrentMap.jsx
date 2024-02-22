import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'
import {supabase} from "/supabase/supabase.js"

const CurrentMap = () => {

    const [jsonLoading, setJsonLoading] = useState(true)
    const [json, setJson] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase.from('maps').select().eq('id', 5);
            console.log(data[0].map_data)
            setJson(data[0].map_data)
            setJsonLoading(false);
        }
        fetchData()
    })



  return (
    <div className='height-[600px] w'>
        <p className='text-2xl text-bold'>Current Map</p>
        <MapContainer center={[40, -74]} zoom={5} scrollWheelZoom={true} style={{height: 900, width: "100%"}}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 
            {jsonLoading ? (<></>) : (
                <GeoJSON data={json}/>
            )}
        </MapContainer>
    </div>
  )
}

export default CurrentMap