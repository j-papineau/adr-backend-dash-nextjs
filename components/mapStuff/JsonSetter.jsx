import React, {useState, useEffect} from 'react'
import { Button, Input, TextField } from '@mui/material'

const JsonSetter = () => {

 

  return (
    <div className='bg-slate-300 flex flex-col rounded-md p-10 items-center justify-center space-y-4'>
        <p className='text-xl'>Set JSON</p>
        <p>This will change the geoJson that is used for customer facing map</p>
        <TextField type='file' />
        <Button variant='contained'>Upload</Button>
    </div>
  )
}

export default JsonSetter