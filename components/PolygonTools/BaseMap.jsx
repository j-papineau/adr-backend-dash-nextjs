"use client"
import React, {useState, useEffect} from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polygon, GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'



const BaseMap = (props) => {

    const [map, setMap] = useState(null);
    const [mapZoom, setMapZoom] = useState(5);
    const [mapCenter, setMapCenter] = useState([40,-74])

  useEffect(() => {
      if (map && props.mapData) {
          // Ensure the map is refreshed when mapData changes
          map.invalidateSize();
      }
  }, [props.mapData, map]);

  return (
    <div>
        <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{height: 600, width: "100%"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 
            <GeoJSON key={JSON.stringify(props.mapData)} data={props.mapData}/>
        </MapContainer>
    </div>
  )
}

export default BaseMap