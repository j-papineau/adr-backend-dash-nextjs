import React, {useState, useEffect} from 'react'
import { LineChart } from '@mui/x-charts'
import { CircularProgress, Typography } from '@mui/material'
import {RegionComparison} from "../../lib/RegionComparison"

const DeviationComparison = ({dataMap}) => {

    const keyToLabel = {
        d_closing: "Deviation in Closing",
        d_cpl: "Deviation in CpL",
        d_ctl: "Deviation in Click to Lead",
        d_score: "Deviation in Score"
      };
    
      const colors = {
        d_closing: "blue",
        d_cpl: "lightblue",
        d_ctl: "orange",
        d_score: "red"
      };
    
      const stackStrategy = {
        stack: 'total',
        area: false,
        stackOffset: 'none', // To stack 0 on top of others
      };
      
      const customize = {
        height: 500,
        legend: { hidden: false },
        margin: { top: 5 },
        stackingOrder: 'descending',
      };

    const [graphLoading, setGraphLoading] = useState(true)
    const [graphData, setGraphData] = useState([])

    function convertTimestampToMMDDYYYY(timestamp) {
        const date = new Date(timestamp);
        
        // Extract month, day, and year components
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        
        // Format into MM/DD/YYYY
        return `${month}/${day}/${year}`;
    }

    useEffect(() => {

        let tempArr = []

        dataMap.forEach(item => {
            let tempObj = new RegionComparison(item)
            let obj = {
                "date": item.date,
                "d_closing": tempObj.delta_closing,
                "d_cpl" : tempObj.delta_cpl,
                "d_ctl": tempObj.delta_ctl,
                "d_score": tempObj.delta_score
            }
            tempArr.push(obj)
        });

        setGraphData(tempArr)
        // console.log(tempArr)
        setGraphLoading(false)

    },[dataMap])

  return (
    <>
        {
            graphLoading ? (<><CircularProgress/></>) : (
            <>
            
            <LineChart
                xAxis={[
                {
                    dataKey:'date',
                    valueFormatter: (v) => (v.toString()),
                    scaleType:'time',
                },
                ]}
                series={Object.keys(keyToLabel).map((key) => ({
                dataKey: key,
                label: keyToLabel[key],
                color: colors[key],
                showMark: false,
                ...stackStrategy
                }))}
                dataset={graphData}
                {...customize}
                width={800}
            />
            <Typography variant='p' color={"gray"}>*0 is baseline* <br /> Deviation is from targets in terms of percentage</Typography>
            </>)
        }
    </>
  )
}

export default DeviationComparison