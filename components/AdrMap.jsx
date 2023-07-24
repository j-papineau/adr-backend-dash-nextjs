import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import dynamic from 'next/dynamic'
import "leaflet/dist/leaflet.css";
//import ReactLeafletKML from 'react-leaflet-kml'




function AdrMap() {

  const position = [51.505, -0.09]

  // const kmlText = ""
  // const parser = new DOMParser();
  // const kml = parser.parseFromString(kmlText, 'text/kml');


  return (
    <>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
  </MapContainer>


    </>
  )
}

export default AdrMap
