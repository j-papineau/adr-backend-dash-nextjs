import React, { useEffect, useState } from 'react'
import { Divider, Button, TextField, Slider } from '@mui/material'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {supabase} from "/supabase/supabase.js"






const SettingsModal = ({row, handleClose, refreshTable}) => {


    let DefaultIcon = L.icon({
        iconUrl: "/images/marker.png",
        iconSize: [32,32]
    })

    let CurrentIcon = L.icon({
        iconUrl: "/images/currentmarker.png",
        iconSize: [32,32]
    })

    useEffect(() => {
        console.log(row)
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });


    },[])

    const [initialPosition, setInitialPosition] = useState([0,0]);
    const [selectedPosition, setSelectedPosition] = useState([0,0]);
    const [selectedZoom, setSelectedZoom] = useState(row.map_zoom);

    const handleZoom = (e, newVal) => {
        setSelectedZoom(newVal)
    }

    const Markers = () => {

        const map = useMapEvents({
            click(e) {                                
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);            
            },            
        })

        return (
            selectedPosition ? 
                <Marker           
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={false} 
                icon={DefaultIcon}
                />
            : null
        )   
        
    }

    const saveChanges = async () => {

        // console.log(selectedPosition[0])
        // console.log(selectedZoom)
        let id = row.id

        const {data, error} = await supabase.from('map_settings').update({'map_lat': selectedPosition[0], 'map_lng': selectedPosition[1], 'map_zoom': selectedZoom}).eq('id', id)
        
        // const {data, error} = await supabase.from('map_settings').update({map_lat: 32, 
        // map_lng: 32, map_zoom: 8}).eq('id', id)


        if(error){
            alert(error.message);
        }else{
            refreshTable();
            handleClose();
        }
    }


  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
        <p className='text-xl'>Current Settings for <b>{row.region}</b></p>

        <div className='flex flex-row space-x-8'>
        <div className='flex flex-col'>
                    <p className='font-bold'>New Lat</p>
                    <TextField disabled value={row.map_lat}/>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold'>New Lng</p>
                    <TextField disabled value={row.map_lng}/>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold'>Zoom</p>
                    <TextField disabled value={row.map_zoom}/>
                </div>
        </div>
        {/*  Map  */}
        {/* center={[40, -74]} */}
            <MapContainer center={[40,-74]} zoom={5} scrollWheelZoom={true} style={{height: 400, width: "100%"}}
            >
                <Marker key={0} interactive="false" position={[row.map_lat, row.map_lng]} icon={CurrentIcon}/>
                <Markers/>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    
                />
            </MapContainer>

            <div className='flex flex-row space-x-8'>
                <div className='flex flex-col'>
                    <p className='font-bold'>New Lat</p>
                    <TextField value={selectedPosition ? (selectedPosition[0]) : ("not selected")}/>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold'>New Lng</p>
                    <TextField value={selectedPosition ? (selectedPosition[1]) : ("not selected")}/>
                </div>
                
            </div>
            <div className='flex flex-col w-full'>
                    <p className='font-bold'>Zoom: {selectedZoom}</p>
                    <Slider value={selectedZoom} max={14} min={2} onChange={handleZoom}/>
                </div>
            <div className='flex flex-row space-x-8'>
                <Button variant='contained' onClick={saveChanges}>Save</Button>
                <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>   
            </div>

    </div>
  )
}

export default SettingsModal