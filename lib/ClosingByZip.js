import * as fh from "./FileHelpers";
import { allZipPolygons } from "../data/all_zip_polys";
import * as turf from "@turf/turf"

export const testFunc = (text) => {
    console.log(text);
}

export const getUniqueZips = (json) => {
    return [...new Set(json.map(item => item["Zip Code"]))];
}

export const convertExcelDatesToSanePersonDates = (json) => {

    for(let i = 0; i < json.length; i++){
        json[i]["Created Date"] = fh.excelDateToDate(json[i]["Created Date"]);
    }

}

export const getMinDate = (json) => {

}

export const getMaxDate = (json) => {

}

export const countZipOccurences = (data) => {
    return data.reduce((acc, item ) => {
        const zip = item["Zip Code"];
        acc[zip] = (acc[zip] || 0) + 1;
        return acc;
    }, {});
}

export const getClosingByZip = (zipArray, soldData, quotedData) => {

    const soldCountMap = countZipOccurences(soldData);
    const quotedCountMap = countZipOccurences(quotedData);
    
    const closingRates = zipArray.reduce((acc, zip) => {
        const soldCount = soldCountMap[zip] || 0;
        const quotedCount = quotedCountMap[zip] || 0;
        const closingRate = soldCount > 0 ? ((soldCount) / (soldCount + quotedCount)).toFixed(2) : 0;
        acc[zip] = {
            soldCount: soldCount,
            quotedCount: quotedCount,
            closingRate: parseFloat(closingRate),
            zip: zip
        };
        return acc;
    }, {});

    return closingRates;

}

const getColorForRate = (rate) => {
    if (rate < 0.25) return '#fc1303';
    if (rate >= 0.25 && rate < 0.35) return '#dce307';
    if (rate >= 0.35 && rate < 0.50) return '#03610c';
    return '#07f71f';
}

export const centerPointOfPolygon = (geometry) => {
    try {
        var poly = turf.polygon(geometry.coordinates);
        var com = turf.centerOfMass(poly);
        return com.geometry.coordinates
        
    } catch (error) {
        console.log("polygon error");
        return [0,0];
    }
    
}

export const getPolygonGeometries = (regionInfo) => {

    // console.log(allZipPolygons[0].features);

    return allZipPolygons[0].features.filter(feature => {
        const zipCode = feature.properties["ZCTA5CE10"];
        return zipCode && regionInfo.hasOwnProperty(zipCode);
    }).map(feature => {
        const zipCode = feature.properties["ZCTA5CE10"];
        const closingRate = regionInfo[zipCode]["closingRate"];
        const color = getColorForRate(closingRate);
        const center = centerPointOfPolygon(feature.geometry);
        return {
            zipCode: zipCode,
            info: regionInfo[zipCode],
            geometry: feature.geometry,
            centerOfMass: center,
            color: color
        };
    });

}


