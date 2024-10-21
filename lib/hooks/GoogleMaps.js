import { supabase } from "../../supabase/supabase";
import * as turf from "@turf/turf"

export const getDrivingRadiusFromLatLng = (lat, lng) => {
    return "test";
}

export const getGeometryOfZips = async  (zips) => {
    const {data, error} = await supabase.from("all_zip_polygons")
    .select("*")
    .in('zip', zips)

    return convertSupaToGeoJSON(data);
}

const convertSupaToGeoJSON = (data) => {
    // Convert each item in the data to a GeoJSON feature
    let features = data.map((item) => {
        // Step 1: Remove the "POLYGON((...))" wrapper
        let coordsStr = item.geometry
            .replace(/^POLYGON \(\((.*)\)\)$/, '$1') // Strip "POLYGON((...))"
            .trim();  // Trim whitespace

        // Step 2: Split by commas to get individual coordinates
        let coordsArray = coordsStr.split(',')
            .map(coord => coord.trim().split(' ').map(Number)); // Convert to [longitude, latitude] and cast to numbers

        // Step 3: Create a GeoJSON feature
        return {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [coordsArray] // Wrap the coordinates in an array
            },
            properties: {
                zip: item.zip // Include other properties, like zip code
            }
        };
    });

    // Step 4: Create a GeoJSON object
    return {
        type: "FeatureCollection",
        features: features
    };
};

const getLatLngFromAddressInput = (input) => {
    
}

