import React, { useEffect, useState } from 'react';
import { Button, Checkbox, CircularProgress, FormControl, InputLabel, MenuItem, Select, Slider, TextField, TextareaAutosize, Typography } from '@mui/material';
import { supabase } from 'supabase/supabase';
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import PriceSlider from './PriceSlider';



const RegionTable = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [rows, setRows] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase.from("region_info").select().order('name', {ascending: true});
            data.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if(nameA < nameB) return -1;
                if(nameA > nameB) return 1;
                return 0;
            });

            setRows(data);
        }
        setIsLoading(true);
        fetchData();
        setIsLoading(false);

    }, [])

    const refreshTable = async () => {
        setIsLoading(true);
        setSelectedRegion(null);
        const {data, error} = await supabase.from("region_info").select();
        data.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(nameA < nameB) return -1;
            if(nameA > nameB) return 1;
            return 0;
        });
        setRows(data);
        setIsLoading(false);
    }

    const handleApplyBtn = async () => {
        // setIsLoading(true);
        const {data, error} = await supabase.from("region_info").update(selectedRegion).eq('regionID', selectedRegion["regionID"])
        if(error){
            alert(error)
        }else{
            alert("Region successfully updated!");
            refreshTable();
        }
    }

  return (
    <div className='flex flex-col space-y-4'>
        <div className='m-2 flex flex-row space-x-4'>
            <Typography variant='h5'>Region Pricing Attributes</Typography>
            <a onClick={refreshTable}>
                <IoMdRefresh fontSize={'40'} className='text-black hover:text-gray-500'/>
            </a>

        </div>
        
        { isLoading ? (<CircularProgress color='secondary'/>) : (
            <div className='p-2 w-20 bg-slate-100 rounded-md'>
                <FormControl>
                    <InputLabel id="selectLabel">Region</InputLabel>
                    <Select className='w-40' 
                    labelId='selectLabel' 
                    id='select' value={selectedRegion}
                    onChange={(e) => {
                        setSelectedRegion(null);
                        console.log(e.target.value);
                        setSelectedRegion(e.target.value);
                    }}>
                        {rows.map((item) => (
                            <MenuItem key={item.regionID} value={item}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
        }

        { (selectedRegion == null) ? (<></>) : (
            <div className='flex flex-col space-y-2'>
                <p className='capitalize'><strong>{selectedRegion.name}:</strong></p>
                <p>RegionID: {selectedRegion.regionID}</p>
                <p><strong>Base Prices:</strong></p>

                <p>10s:</p>
                <div className='flex flex-row'>
                    <TextField value={selectedRegion["10_price"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Price"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["10_price"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["10_weight"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Weight"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["10_weight"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["10_per_thou"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Price per 1000lbs"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["10_per_thou"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                </div>

                <p>15s:</p>
                <div className='flex flex-row'>
                    <TextField value={selectedRegion["15_price"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Price"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["15_price"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["15_weight"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Weight"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["15_weight"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["15_per_thou"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Price per 1000lbs"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["15_per_thou"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                </div>

                <p>20s:</p>
                <div className='flex flex-row'>
                    <TextField value={selectedRegion["20_price"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Price"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["20_price"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["20_weight"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Weight"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["20_weight"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["20_per_thou"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Price per 1000lbs"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["20_per_thou"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                </div>

                <p>30s:</p>
                <div className='flex flex-row'>
                    <TextField value={selectedRegion["30_price"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Price"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["30_price"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["30_weight"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Weight"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["30_weight"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["30_per_thou"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Price per 1000lbs"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["30_per_thou"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                </div>

                <p>40s:</p>
                <div className='flex flex-row'>
                    <TextField value={selectedRegion["40_price"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Price"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["40_price"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["40_weight"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Base Weight"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["40_weight"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                    <TextField value={selectedRegion["40_per_thou"]}
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    label="Price per 1000lbs"
                    onChange={(e) => {
                        let old = { ...selectedRegion};
                        old["40_per_thou"] = parseInt(e.target.value);
                        setSelectedRegion(old);
                    }}/>
                </div>

                <div className='flex flex-row pt-4'>
                    <TextField value={selectedRegion["days_allowed"]}
                    type='number'
                        InputLabelProps={{ shrink: true }}
                        label="Days Allowed"
                        onChange={(e) => {
                            let old = { ...selectedRegion};
                            old["days_allowed"] = parseInt(e.target.value);
                            setSelectedRegion(old);
                    }}/>

                    <TextField value={selectedRegion["extra_day"]}
                    type='number'
                        InputLabelProps={{ shrink: true }}
                        label="Extra Day Charge"
                        onChange={(e) => {
                            let old = { ...selectedRegion};
                            old["extra_day"] = parseInt(e.target.value);
                            setSelectedRegion(old);
                    }}/>
                </div>
                
                <p>Paste From CRM:</p>

                
                 
                <TextField value={selectedRegion["pbz_note"]}
                        multiline
                        InputLabelProps={{ shrink: true }}
                        label="CRM info"
                        rows={10}
                        onChange={(e) => {
                            let old = { ...selectedRegion};
                            old["pbz_note"] = e.target.value;
                            setSelectedRegion(old);
                    }}/>
                
                
                <Button variant='contained' onClick={(e) => {
                    console.log(selectedRegion)
                    handleApplyBtn();
                }}>
                    Apply
                </Button>
            </div>
        )}
    </div>
  )
}

export default RegionTable