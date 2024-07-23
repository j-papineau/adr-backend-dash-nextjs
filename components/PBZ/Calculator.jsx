import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Slider, Switch, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import {supabase} from "/supabase/supabase.js"
import * as turf from '@turf/turf'


const Calculator = () => {

    const [selectedRegion, setSelectedRegion] = useState({
        "regionID": 0,
        "10_per_thou": 0,
        "10_price": 0,
        "10_weight": 0,
        "15_per_thou": 0,
        "15_price": 0,
        "15_weight": 0,
        "20_per_thou": 0,
        "20_price": 0,
        "20_weight": 0,
        "30_per_thou": 0,
        "30_price": 0,
        "30_weight": 0,
        "40_per_thou": 0,
        "40_price": 0,
        "40_weight": 0,
        "extra_day": 0,
        "days_allowed": 0,
        "pbz_note": "no region set"
    })

    const [poly, setPoly] = useState(null)

    const [searchZip, setSearchZip] = useState(null);

    const [displayResults, setDisplayResults] = useState(null);

    const [selectedSize, setSelectedSize] = useState(10);

    const [days, setDays] = useState(14);

    const [weight, setWeight] = useState(1000);

    const [weightEnabled, setWeightEnabled] = useState(true);

    const [searching, setSearching] = useState(false);

    const [showResults, setShowResults] = useState(false);

    const [priceNoWeight, setPriceNoWeight] = useState(0);

    const [finalPrice, setFinalPrice] = useState(0);

    const [basePrice, setBasePrice] = useState(0);

    const [zoneModifier, setZoneModifier] = useState(0);

    const [weightCost, setWeightCost] = useState(0);

    const [daysCost, setDaysCost] = useState(0);

    const [perDay, setPerDay] = useState(0);

    const [note, setNote] = useState("");

    const execSearch = async() => {
        setSearching(true);
        setShowResults(true);

        console.log("searching");
        //validate input
        if(searchZip == null){
            alert("invalid input");
            return;
        }

        //get zip lat lng
        let coords = await getZipLatLng(searchZip)

        //get polygon zone
        let polygon = await getZone(coords);
        if(polygon == null){
            abortSearch();
        }
        // console.log(polygon);
        
        let region = await getRegion(polygon.properties.regionID);

        if(region == null){
            abortSearch();
        }

        setSelectedRegion(region);

        priceCalculation(region, polygon);
        

        setSearching(false);
    }

    const priceCalculation = (region, polygon) => {
        //do stuff here to get final price and options
        //check size avail first
        let sizeString = selectedSize + 's'
        
        if(polygon.properties[sizeString] != 'yes'){
            alert("that size is not available in this region.");
            return;
        }

        //calc price
        // console.log(region);
        setBasePrice(region[selectedSize + "_price"]);
        setZoneModifier(polygon.properties[selectedSize + "_add"]);

        console.log(basePrice);
        console.log(zoneModifier);

        let perThou = region[selectedSize + "_per_thou"];
        setWeightCost(0);

        if(weightEnabled){
            let extraWeight = weight - region[selectedSize + "_weight"];
            if(extraWeight > 0){
                let thous = Math.ceil(extraWeight / 1000);
                console.log(thous + " thous extra")
                setWeightCost(thous * perThou);
            }
        }

        setDaysCost(0);

        if(days > region["days_allowed"]){
            setDaysCost((days - region["days_allowed"]) * region["extra_day"]);
        }

    }

    const getZone = async(coords) => {

        const {data, error} = await supabase.storage.from("pricing-by-zip").download("PBZmap.geojson");
        let json = await blobToJson(data);
        // console.log(json);
        const point = turf.point([coords[1], coords[0]]);

        for(let i = 0; i < json.features.length; i++){
            const feature = json.features[i];

            if(feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon'){
                if(turf.booleanPointInPolygon(point, feature)){
                    return feature;
                }
            }
        }
        return null;
    }

    const getRegion = async(regionID) => {
        const {data, error} = await supabase.from("region_info").select().eq("regionID", regionID);
        return data[0];
    }

    const abortSearch = () => {
        alert("error getting pricing, data may be unavailable or zip is outside service areas")
    }

    const getZipLatLng = async(zip) => {
        const { data, error} = await supabase.from("all_zips").select().eq("zip", zip);
        console.log(data[0]);

        return [data[0].lat, data[0].lng];
    }

    function blobToJson(blob){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (event) {
                try{
                    const json = JSON.parse(event.target.result);
                    resolve(json);
                } catch(e){
                    reject(e);
                }
            };

            reader.onerror = function(event) {
                reject(new Error('FileReader error' + event.target.error.code));
            };

            reader.readAsText(blob)
        })
    }


    

  return (
    <div className='flex flex-col space-y-4'>
        <div className='bg-slate-200 p-2 rounded-md space-y-2'>
            <Typography variant='h5'>PBZ Calculator</Typography>

            <div className='flex flex-row space-x-2'>
                <TextField value={searchZip}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Zip Code"
                    onChange={(e) => {
                    setSearchZip(e.target.value)
                }}/>
                <FormControl>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedSize}
                        label="Size"
                        onChange={(e) => {
                            setSelectedSize(e.target.value);
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                    </Select>
                </FormControl>

                <TextField value={days}
                    label='# of Days'
                    type='number'
                    InputLabelProps={{shrink: true}}
                    onChange={(e) => {
                        setDays(e.target.value)
                }}/>

                
            </div>

            <div className='flex flex-col'>
                <p>Weight Calculation?</p>
                <Switch value={weightEnabled} defaultChecked onChange={(e) => {
                    setWeightEnabled(!weightEnabled);
                }}/>
                    <p>Estimated Weight: <strong>{weight}lbs.</strong> (about {Math.round(weight / 25)} full trash bags)</p>
                    <Slider disabled={!weightEnabled} value={weight} onChange={(e) => {setWeight(e.target.value)}}
                        min={100} max={10000} step={10} />
            </div>

            <Button variant='contained' onClick={execSearch}>Get Pricing</Button>
        </div>

        <div className='bg-slate-200 p-2 rounded-md space-y-2'>
            {(!showResults) ? (<></>) : (<>
            <Typography variant='h5'>Results</Typography>
            {(searching) ? (<CircularProgress/>) : (
                <>
                    <p><strong>Region:</strong> {selectedRegion.name}</p>
                    
                    <div className='flex flex-col my-4'>
                        <Typography variant='h5'>Price Breakdown</Typography>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                            <div className='bg-slate-300 rounded-md p-4 text-center'>
                                <Typography variant='p'>Base Price</Typography>
                                <Typography variant='h6'>${basePrice + zoneModifier}</Typography>
                            </div>
                            <div className='bg-slate-300 rounded-md p-4 text-center'>
                                <Typography variant='p'>Weight Charges</Typography>
                                <Typography variant='h6'>${weightCost}</Typography>
                            </div>
                            <div className='bg-slate-300 rounded-md p-4 text-center'>
                                <Typography variant='p'>Extra Day Charges</Typography>
                                <Typography variant='h6'>${daysCost}</Typography>
                            </div>
                            <div className='bg-slate-300 rounded-md p-4 text-center'>
                                <Typography variant='h6'><strong>Final Price</strong></Typography>
                                <Typography variant='h5'>${basePrice + zoneModifier + weightCost + daysCost}</Typography>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <TextField value={selectedRegion["pbz_note"]}
                                multiline
                                InputLabelProps={{ shrink: true }}
                                label="CRM info"
                                rows={10}
                                fullWidth
                                disabled={true}
                            />
                        </div>
                        
                    </div>


                </>
            )}
            
            </>)}
            
        </div>

    </div>
  )
}

export default Calculator