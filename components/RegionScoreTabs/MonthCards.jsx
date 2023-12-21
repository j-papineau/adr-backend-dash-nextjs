import React, { useEffect } from 'react'
import { Typography, Card, CardActions, CardContent, Button, Box } from '@mui/material'
import {FaArrowCircleUp, FaArrowCircleDown} from "react-icons/fa"

const MonthCards = ({selected, sumObj}) => {

    useEffect(() => {
      
    },[])

    const scoreGood = (selected.score >= sumObj.score)


  return (
    <div>
      {(typeof sumObj != null) ? (
      <div className='flex flex-row mb-2 space-x-2'>
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <Typography color="text.secondary">
              Score
            </Typography>
            <Typography variant="h5" component="div" className={scoreGood ? 'text-green-500' : 'text-red-500'}>
              {Math.round(100 * selected.score) / 100}
            </Typography>
            <div className='flex flex-row items-center space-x-2'>
              {
                scoreGood ? (<FaArrowCircleUp/>) : (<FaArrowCircleDown/>)
              }
              <p>{Math.round(((selected.score - sumObj.score) / sumObj.score) * 100)}% from average</p>
            </div>
          </CardContent>
        </Card>
    </div>) : (<></>)}
    </div>
  )
}

export default MonthCards