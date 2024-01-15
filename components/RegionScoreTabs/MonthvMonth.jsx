import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/supabase'
import { Select, Typography, Divider, FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText, CircularProgress, Button,
    Card, CardContent, CardActions} from '@mui/material'
import { Region } from '../../lib/Regions'

const MonthvMonth = () => {

    //state logic for month select and initial data call

    const [datasets, setDatasets] = useState(null)
    const [selectLoading, setSelectLoading] = useState(true)

    const [selectedMonthOne, setSelectedMonthOne] = useState(null)
    const handleMonthOneChange = (e) => {
        setSelectedMonthOne(e.target.value)
    }

    const [selectedMonthTwo, setSelectedMonthTwo] = useState(null)
    const handleMonthTwoChange = (e) => {
        setSelectedMonthTwo(e.target.value)
    }

    useEffect(() => {
        
        const getMonths = async() => {
            const {data, error} = await supabase.from("region_score_data").select("id, dataset_name").eq("period", "month")
            setDatasets(data)
            setSelectLoading(false)
        }

        getMonths();

    },[])

    //state logic for begin report and multi-select

    const [regionsObjOne, setregionsObjOne] = useState([])
    const [regionsObjTwo, setregionsObjTwo] = useState([])

    const [availableReg, setAvailableReg] = useState([])

    const [commonNames, setCommonNames] = useState([])
    const [namesLoaded, setNamesLoaded] = useState(false)

    const createRegions = async () => {
        setNamesLoaded(false)
        setCommonNames([])
        
        setregionsObjOne([])
        setregionsObjTwo([])
        let temp = await getDataAndObj(selectedMonthOne)
        setregionsObjOne(temp)
        temp = await getDataAndObj(selectedMonthTwo)
        setregionsObjTwo(temp)

        //parse both sets of data to make sure to only present the regions that both datasets have in common
        console.log(regionsObjOne.length)
        console.log(regionsObjTwo.length)

        const nameOne = extractUniqueRegionNames(regionsObjOne)
        const nameTwo = extractUniqueRegionNames(regionsObjTwo)

        const common = [...nameOne].filter(name => nameTwo.has(name))

        setCommonNames(common)
        setNamesLoaded(true)


    }

    const extractUniqueRegionNames = (arr) => {
        const uniqueNames = new Set();
        arr.forEach(region => uniqueNames.add(region.name));
        return uniqueNames;
      };

    const getDataAndObj = async (month) => {
        const {data, error} = await supabase.from("region_score_data").select("data").eq("dataset_name", month)
        if(error){
            return null
        }

        let rows = data[0].data
        rows.shift()

        let tempArr = []
        let count = 0
        let emptyarr = Array(25).fill("1")
        let tempObj = new Region(emptyarr)
        rows.forEach(row => {
            if(!row.includes("")){
                let obj = new Region(row)
                tempArr.push(obj)
                tempObj.increment(row)
                count += 1
            }
        });

        return tempArr
        
    }

    //logic for generating reports

    const [selectedRegion, setSelectedRegion] = useState("")
    const selectedRegionChange = (e) => {
        setSelectedRegion(e.target.value)
    }


    


  return (
    <div className='flex flex-col p-2'>
        <div className='flex flex-row space-x-4 items-center'>
            { selectLoading ? (<CircularProgress/>) : (
                <div className='flex flex-row space-x-4 items-center'>
                <FormControl sx={{m: 1, width: 200}}>
                    <InputLabel id="months-label">Month 1</InputLabel>
                    <Select
                       labelId='select-label'
                       id='select-month'
                       value={selectedMonthOne}
                       label="Month One"
                       onChange={handleMonthOneChange}
                    >
                        {datasets.map((item) => (
                            <MenuItem key={item.id} value={item.dataset_name}>
                                <ListItemText primary={item.dataset_name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, width: 200}}>
                    <InputLabel id="months-label">Month 2</InputLabel>
                    <Select
                       labelId='select-label'
                       id='select-month'
                       value={selectedMonthTwo}
                       label="Month Two"
                       onChange={handleMonthTwoChange}
                    >
                        {datasets.map((item) => (
                            <MenuItem key={item.id} value={item.dataset_name}>
                                <ListItemText primary={item.dataset_name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button onClick={createRegions} className='h-[50px]' variant='contained'>Begin Report</Button>

                {
                    !(namesLoaded) ? (<></>) : (
                        <FormControl sx={{m:1, width: 200}}>
                            {console.log(commonNames)}
                            <InputLabel id="region-label">Region</InputLabel>
                            <Select
                                labelId='region-label'
                                id='select-region'
                                value={selectedRegion}
                                label="Region"
                                // input={<OutlinedInput label="Name" />}
                                onChange={selectedRegionChange}
                            >
                                {['Region1', 'Region2', 'Region3'].map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                                {/* {commonNames.map((name) => {
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                })} */}
                            </Select>
                        </FormControl>
                    )
                }

                </div>
            )}
        </div>
    </div>
  )
}

export default MonthvMonth