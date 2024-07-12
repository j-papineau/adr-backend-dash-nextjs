import React from 'react'
import { Input, Typography, Divider, Button} from '@mui/material'
import StripMarkers from './StripMarkers'
import ReplaceFile from './ReplaceFile'

const FileStuff = () => {

  return (
    <div className='flex-col space-y-4'>
        <StripMarkers/>
        <ReplaceFile/>
    </div>
  )
}

export default FileStuff