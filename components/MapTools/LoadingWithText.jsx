import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingWithText = ({textDisplay}) => {
  return (
    <div className='flex flex-col'>
        <p>{textDisplay}</p>
        <CircularProgress/>
    </div>
  )
}

export default LoadingWithText