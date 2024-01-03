import React, { useEffect, useState } from 'react'
import { Select, Typography, Divider, FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText, CircularProgress, Button,
    Card, CardContent, CardActions} from '@mui/material'
import { Region } from '../../lib/Regions';

const OverallReport = ({data}) => {

    const [parseDone, setParseDone] = useState(false);

    const parseRegionsFromRow = (row) => {
        let arr = []

        for(let i = 1; i < row.data.length; i++){
            try {
                let obj = new Region(row.data[i]);
                arr.push(obj)
            } catch (error) {
            }  
        }
        return arr
    }

    useEffect(() => {


        let tempDataObjs = []
            data.forEach(row => {
                let tempRegionArr = parseRegionsFromRow(row)
                let obj = {
                    id: row.id,
                    range: row.dataset_name,
                    obj: tempRegionArr,
                    start: new Date(row.start_date)
                }
                tempDataObjs.push(obj)
            });

            tempDataObjs.sort((a,b) => a.start - b.start)
            console.log(tempDataObjs)

        setParseDone(false)

        

    }, [data])

  return (
    <div>
        {parseDone ? (<></>) : (<><p>Note: this is a large report and may take a while</p><CircularProgress/></>)}

        

    </div>
  )
}

export default OverallReport