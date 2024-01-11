import React, { useEffect } from 'react'
import { Typography, Card, CardActions, CardContent, Button, Box } from '@mui/material'

const RegionHealthCards = ({data}) => {


    useEffect(() => {

    }, [data])

  return (
    <div className='flex flex-row mt-10'>
        <Card sx={{ maxWidth: 275}} className='drop-shadow-xl'>
          <CardContent>
            <Typography color="text.secondary">
              {data.range}
            </Typography>
            <Typography variant="h5" component="div">
              <p>h5 section</p>
            </Typography>
            <div className='flex flex-row items-center space-x-4'>
                <p>bottom</p>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default RegionHealthCards