import React, { useEffect } from 'react'
import { Typography, Card, CardActions, CardContent, Button, Box } from '@mui/material'

const MonthCards = ({selected, sumObj}) => {

    useEffect(() => {
      
    },[])


  return (
    <div>
      {(typeof sumObj != null) ? (
      <div className='flex flex-row mb-2 space-x-2'>
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {selected.name}
            </Typography>
            <Typography variant="h5" component="div">
              65
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
    </div>) : (<></>)}
    </div>
  )
}

export default MonthCards