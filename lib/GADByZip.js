import { zip } from "d3";
import { allZipPolygons } from "../data/all_zip_polys";
import * as turf from "@turf/turf"
import * as CBZ from "./ClosingByZip"

export const trimZips = (json) => {
    for(let i = 0; i < json.length; i++){


        const match = json[i]["Matched location"].match(/^\d+/);
        const zipCode = match ? match[0] : null;

        json[i]["Matched location"] = zipCode;
    }

    return json
}

const getColorForCPL = (cpl) => {
    //target 22
    if (cpl > 25) return '#fc1303';
    if (cpl <= 25 && cpl > 20) return '#dce307';
    if (cpl < 20) return '#03610c';
return '#fc1303'
}

const getColorForCTL = (ctl) => {
    if (ctl > .35) return '#03610c';
    if (ctl >= .22 && ctl <= .35) return '#dce307'
    if(ctl < .22) return '#fc1303'
return '#fc1303'
}

export const joinLeadstoGad = (leadsCount, gadData, colorCodeMode) => {

    //modes: ctl cpl

    // console.log(leadsCount)
    // console.log(leadsCount[10001])
    let zipGeoMap = generateZipGeometryMap()
    // console.log(zipGeoMap)

    for(let i = 0; i < gadData.length; i++){
        let item = gadData[i];
        item["Leads"] = leadsCount[Number(item["Matched location"])] || 0;
        item["CPL"] = (item["Cost"] / item["Leads"]);
        if(item["CPL"] > 999){item["CPL"] = -1}
        item["CTL"] = item["Leads"] / item["Clicks"]

        if(colorCodeMode == "CPL"){
        item["color_code"] = getColorForCPL(item["CPL"])
        }else{
            item["color_code"] = getColorForCTL(item["CTL"])
        }
        item["geometry"] = zipGeoMap[Number(item["Matched location"])]
        item["center"] = CBZ.centerPointOfPolygon(zipGeoMap[Number(item["Matched location"])])
    }

    return gadData

}

export const generateZipGeometryMap = (gadData) => {

    // console.log(allZipPolygons[0].features);
    let zip_to_geometry = {}
    
    allZipPolygons[0].features.forEach(feature => {
        const zipCode = feature.properties["ZCTA5CE10"];
        const geometry = feature.geometry;
        zip_to_geometry[zipCode] = geometry;
    })

    return zip_to_geometry;

}