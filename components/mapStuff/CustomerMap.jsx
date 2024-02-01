'use client'
import dynamic from 'next/dynamic'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'
import {supabase} from "/supabase/supabase.js"


const ModalMap = () => {
    // 37.0902° N, 95.7129° W
    const [jsonLoading, setJsonLoading] = useState(true)
    const [json, setJson] = useState({});

    useEffect(() => {
        //fetch most current json in DB
        //customer map id 2
        const fetchData = async () => {
            const {data, error} = await supabase.from('maps').select().eq('id', 2);
            // console.log(data[0].map_data)
            setJson(data[0].map_data)
            setJsonLoading(false);
        }
        fetchData()
    },[])

  return (
    <MapContainer center={[40, -74]} zoom={5} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {jsonLoading ? (<></>) : (
        <GeoJSON data={json}/>
      )}
      
    </MapContainer>
  )
}

export default ModalMap