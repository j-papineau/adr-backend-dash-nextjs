import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import {supabase} from "/supabase/supabase.js"
import { Button, FormControl, ListItemText, MenuItem, Select } from '@mui/material'
import { MdRefresh } from 'react-icons/md'

const OnSiteMap = () => {

  const [json, setJson] = useState({})
  const [jsonLoading, setJsonLoading] = useState(true)
  const [map, setMap] = useState(null)

  const [settingsLoading, setSettingsLoading] = useState(true)
  const [mapSettings, setMapSettings] = useState([])

  useEffect(() => {
    const fetchJson = async () => {
        const {data, error} = await supabase.from("maps").select().eq('id', 2)
        setJson(data[0].map_data)
        setJsonLoading(false);
    }
    const fetchMapSettings = async () => {
        const {data, error} = await supabase.from("map_settings").select()
        console.log(data)
        setMapSettings(data)
        setSettingsLoading(false)
    }

    fetchJson();
    fetchMapSettings();
  }, [])

  const [selectedRegion, setSelectedRegion] = useState("")

  const selectChange = (e) => {
    console.log(e.target.value)
    let val = e.target.value
    setSelectedRegion(val)
    map.setView([val.map_lat, val.map_lng], val.map_zoom)
  }

  const refresh = async () => {
    setSettingsLoading(true)
    const {data, error} = await supabase.from("map_settings").select()
    console.log(data)
    setMapSettings(data)
    setSettingsLoading(false)
  }

  return (
    <>
    <a onClick={refresh}>
      <MdRefresh size={22} className='hover:text-slate-500'/>
    </a>
    {settingsLoading ? (<></>) : (
      <FormControl>
      <Select sx={{m:1, width:200}} 
      value={selectedRegion}
      onChange={selectChange}>
        {mapSettings.map((item) => (
          <MenuItem key={item.id} value={item}>
            <ListItemText primary={item.region}/>
          </MenuItem>
        ))}
      </Select>
      </FormControl>)}

        <p className='text-2xl font-bold'>Site Preview</p>
        <MapContainer center={[40,-74]} zoom={5} scrollWheelZoom={true} style={{height: 400}}
        ref={setMap}
        >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {jsonLoading ? (<></>): (
          <GeoJSON data={json}/>
        )}
        </MapContainer>

    </>
  )
}

export default OnSiteMap