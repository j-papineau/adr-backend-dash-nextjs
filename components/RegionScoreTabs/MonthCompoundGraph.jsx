import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts'
import { CircularProgress } from '@mui/material';

const uData = [4000, 3000, 2000, 2780, 1890, 2390];
const pData = [2400, 1398, 9800, 3908, 4800, 3800];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];


const MonthCompoundGraph = ({dataMap}) => {

  const [scoreData, setScoreData] = useState(null)
  const [ctlData, setCtLData] = useState(null)
  const [graphLoading, setGraphLoading] = useState(true)

  //graph stuff
  const [graphLabels, setGraphLabels] = useState([])

  //clicks, closing_rate, cpc, cpl, date, id, score

  const keyToLabel = {
    clicks: "clicks",
    closing_rate: "Close%",
    cpc: "Cost per Click",
    cpl: "Cost per Lead",
    score: "Score"
  };

  const colors = {
    clicks: "blue",
    closing_rate: "orange",
    cpc: "blue",
    cpl: "orange",
    score: "blue"
  };

  const stackStrategy = {
    stack: 'total',
    area: true,
    stackOffset: 'none', // To stack 0 on top of others
  };
  
  const customize = {
    height: 300,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: 'descending',
  };

  useEffect(() => {
    console.log(dataMap)
    // console.log(dataMap.keys())
    // console.log(dataMap.values())
    // let tempLabels = []
    // for (const [key, value] of dataMap){
    //   tempLabels.push(key)
    // }

    // setGraphLabels(tempLabels)
    setGraphLoading(false)

  }, [])

  
  return (
    <>
    {graphLoading ? (<><CircularProgress/></>) : (
    <>
      <LineChart
        xAxis={[
          {
            dataKey:'date',
            valueFormatter: (v) => v.toString(),
            scaleType:'time'
          },
        ]}
        series={Object.keys(keyToLabel).map((key) => ({
          dataKey: key,
          label: keyToLabel[key],
          color: colors[key],
          showMark: false,
          ...stackStrategy
        }))}
        dataset={dataMap}
        {...customize}
      />
    </>)}
    </>

    
  )
}

export default MonthCompoundGraph