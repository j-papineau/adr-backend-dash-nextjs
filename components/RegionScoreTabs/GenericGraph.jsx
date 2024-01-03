import React, {useEffect, useState} from 'react'
import { LineChart, ChartContainer, LinePlot, MarkPlot, ChartsReferenceLine, ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
import { CircularProgress } from '@mui/material';


const GenericGraph = ({dataMap, metric, target}) => {

    const [dataArr, setDataArr] = useState(null)
    const [labelArr, setLabelArr] = useState(null)

    useEffect(() => {

        // console.log(dataMap)

        let tempDataArr = []
        let tempLabelArr = []

        dataMap.forEach(item => {
            tempDataArr.push(item[metric])
            tempLabelArr.push(new Date(item.date))
        });

        tempDataArr.reverse()
        tempLabelArr.reverse()

        setDataArr(tempDataArr)
        setLabelArr(tempLabelArr)
    }, [dataMap, metric])


  return (
    <div>
        <p className='text-black capitalize text-xl'>Trend in {metric}</p>
        <p className='text-slate-400 capitalize text-l'>Goal: {target}</p>
        {
            (dataArr == null) ? (<><CircularProgress/></>) : (
            <>
            {/* <LineChart
                width={700}
                height={400}
                series={[
                    { data: dataArr, label: metric },
                ]}
                xAxis={[{ scaleType: 'point', data: labelArr }]}
            />             */}
            <ChartContainer
            width={600}
            height={500}
            series = {[
                {data: dataArr, label: metric, type:'line'}
            ]}
            xAxis={[{ scaleType: 'point', data: labelArr }]}
            >
                <LinePlot/>
                <MarkPlot/>
                <ChartsReferenceLine y={target} label="Target" lineStyle={{ stroke: 'red' }} /> 
                <ChartsXAxis />
                <ChartsYAxis />   
            </ChartContainer>
            

            </>)
        }

    </div>
  )
}

export default GenericGraph