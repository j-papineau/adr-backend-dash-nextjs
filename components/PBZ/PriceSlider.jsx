import React, {useState} from 'react'
import { Box, Typography, Grid, Slider, Input } from '@mui/material'

const PriceSlider = ({varName, selectedRegion, label}) => {


  return (
    <div className='flex flex-col'>
        <p>10s</p>
        <div className='flex flex-row'>
            <p>{selectedRegion.varName}</p>
            <Slider/>
        </div>
    </div>
  )
}

export default PriceSlider