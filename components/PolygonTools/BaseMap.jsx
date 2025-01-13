"use client"
import React, {useState, useEffect} from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polygon, GeoJSON, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from '@mui/material'
import * as GM from '../../lib/hooks/GoogleMaps'
import { useJsApiLoader } from '@react-google-maps/api'


const purpleOptions = { color: 'purple' }

const BaseMap = (props) => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_G_KEY
    })

    const [map, setMap] = useState(null);
    const [mapZoom, setMapZoom] = useState(5);
    const [mapCenter, setMapCenter] = useState([40,-74])
    const [markerPos, setMarkerPos] = useState(null);
    const [circlePointsMap, setCirclePointsMap] = useState(null);
    const [polylines, setPolylines] = useState([]);
    const [drivePolyPoints, setDrivePolyPoints] = useState([])
    const [drivePolygon, setDrivePolygon] = useState(null);

  useEffect(() => {
      if (map && props.mapData) {
          // Ensure the map is refreshed when mapData changes
          map.invalidateSize();
      }
  }, [props.mapData, map, polylines, drivePolygon]);

  const handleButton = () => {
    console.log("testing isodistance");
    setMarkerPos([28.5, -81.3]);
    testIso();
  }

  const testIso = () => {
    setCirclePointsMap([])
    setPolylines([])
    setDrivePolyPoints([])
    var sp = getCirclePoints([28.5, -81.3], 30);
    getDirections(sp, [28.5, -81.3]);

  }

  const makePolylineFromGM = (polyline) => {
    var points = []
    for(var n = 0; n < polyline.getPath().getLength() - 1; n++){
        points.push([polyline.getPath().getAt(n).lat(), polyline.getPath().getAt(n).lng()])
    }

    let temp = polylines
    const newPolyline = (
        <Polyline pathOptions={purpleOptions} key={points[10]} positions={points}/>
    )
    temp.push(newPolyline);
    setPolylines(temp);
  }

  const getCirclePoints = (center, radius) => {
    
    var pointInterval = 30;
    var distToDrive = 30;

    // var bounds = new google.maps.LatLngBounds();
    var circlePoints = [];
    var searchPoints = [];
    var rLat = (radius / 3963.189) * (180 / Math.PI);
    var rLng = rLat / Math.cos(center[0] * (Math.PI / 180));
    for (var a = 0; a < 361; a++) {
        var aRad = a * (Math.PI / 180);
        var x = center[1] + (rLng * Math.cos(aRad));
        var y = center[0] + (rLat * Math.sin(aRad));
        var point = [parseFloat(y), parseFloat(x)]
        circlePoints.push(point)
        var gmPoint = new google.maps.LatLng(parseFloat(y), parseFloat(x), true);
        if (a % pointInterval == 0){
            searchPoints.push(gmPoint);
        }
    }

        setCirclePointsMap(circlePoints); 
        return searchPoints;   

  }

  const getDirections = (searchPoints, center) => {
    console.log("getting dirs")
    var dirService = new google.maps.DirectionsService();
    var polyline;

    if(searchPoints.length < 1) {
        return;
    }
    var to = searchPoints.shift();
    
    var request = {
        origin: new google.maps.LatLng(parseFloat(center[0]), parseFloat(center[1]), true),
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING
    };

    dirService.route(request, function (result, status) {
        if(status == google.maps.DirectionsStatus.OK) {
            var distance = parseInt(result.routes[0].legs[0].distance.value / 1609);
            var duration = parseFloat(result.routes[0].legs[0].duration.value / 3600).toFixed(2);
            var path = result.routes[0].overview_path;
            var legs = result.routes[0].legs;
            if(polyline && polyline.setPath){
                polyline.setPath([])
            }else{
                polyline = new google.maps.Polyline({
                    path: [],
                    strokeColor: "#FF0000",
                    strokeOpacity: 1
                })
            }

            for (var i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                for(var j = 0; j < steps.length; j++){
                    var nextSegment = steps[j].path;
                    for (var k = 0; k < nextSegment.length; k++){
                        polyline.getPath().push(nextSegment[k]);
                    }
                }
            }
            shortenAndShow(polyline)
            getDirections(searchPoints, center);
        }else{
            console.log("Dir Req failed. " + status);
        }  
    })
  }

  const shortenAndShow = (polyline) => {
    var distToDriveM = 30 * 1609;
    var dist = 0;
    var cutoffIndex = 0;
    var copyPoints = Array();
    for(var n = 0; n < polyline.getPath().getLength() - 1; n++) {
        dist += google.maps.geometry.spherical.computeDistanceBetween(polyline.getPath().getAt(n), polyline.getPath().getAt(n + 1));
        if(dist < distToDriveM) { 
            copyPoints.push(polyline.getPath().getAt(n));
        }else {
            break;
        }
    }
    var lastPoint = copyPoints[copyPoints.length - 1];
    lastPoint = [lastPoint.lat(), lastPoint.lng()];

    var newLine = new google.maps.Polyline({
        path: copyPoints,
        strokeColor: '#ff0000',
        strokeWeight: 2,
        strokeOpacity: 1
    });

    makePolylineFromGM(newLine);

    setDrivePolyPoints((prevItems) => [...prevItems, lastPoint])

    if (drivePolyPoints.length > 3){
        if(drivePolygon){
            setDrivePolygon(null);
        }

        setDrivePolygon((<Polygon pathOptions={purpleOptions} positions={drivePolyPoints}/>));
    }

    

  }

  return (
    <div>
        {isLoaded && (
            <>
            <MapContainer ref={setMap} center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} style={{height: 600, width: "100%"}}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> 
                {(markerPos != null) && (
                    <Marker position={markerPos} />
                )}
                {(circlePointsMap != null) && (
                    <Polygon positions={circlePointsMap}/>
                )}
                {(polylines.length >= 1) && (
                    polylines.map((element) => element)
                )}
                {(drivePolygon != null) && (
                    drivePolygon
                )
                }
                <GeoJSON key={JSON.stringify(props.mapData)} data={props.mapData}/>
            </MapContainer>
            <Button onClick={handleButton} variant='contained'>Test Isodistance</Button>
            </>
        )}
        
    </div>
  )
}

export default BaseMap