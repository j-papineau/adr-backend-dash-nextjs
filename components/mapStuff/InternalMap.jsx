'use client'
import dynamic from 'next/dynamic'
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo } from 'react'

const InternalMap = () => {
    // 37.0902° N, 95.7129° W

  return (
    <MapContainer center={[40, -74]} zoom={5} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <GeoJSON data={geoJson}/> */}
    </MapContainer>
  )
}

export default InternalMap