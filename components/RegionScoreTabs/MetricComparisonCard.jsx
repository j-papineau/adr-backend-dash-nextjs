import React, { useEffect } from 'react'
import { Typography, Card, CardActions, CardContent, Button, Box } from '@mui/material'
import {FaArrowCircleUp, FaArrowCircleDown} from "react-icons/fa"

const MetricComparisonCard = ({metricName, metric, avg, inverse, suffix}) => {

    useEffect(() => {
      
    },[])

    const metricGood = inverse ? ((metric <= avg)) : ((metric >= avg))

    const change = ((metric - avg) / avg) * 100


  return (
    <div>
      {(typeof sumObj != null) ? (
      <div className='flex flex-row mb-2 space-x-2'>
        <Card sx={{ maxWidth: 275}}>
          <CardContent>
            <Typography color="text.secondary">
              {metricName}
            </Typography>
            <Typography variant="h5" component="div" className={metricGood ? 'text-green-500' : 'text-red-500'}>
              {Math.round(100 * metric) / 100}{suffix}
            </Typography>
            <div className='flex flex-row items-center space-x-4'>
                {metricGood ? (<FaArrowCircleUp/>) : (<FaArrowCircleDown/>)}
                <p>{Math.round(100 * change) / 100}% from avg</p>
            </div>
          </CardContent>
        </Card>
    </div>) : (<></>)}
    </div>
  )
}

export default MetricComparisonCard