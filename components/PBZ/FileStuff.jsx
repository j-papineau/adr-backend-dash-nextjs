import React from 'react'
import { Input, Typography, Divider, Button} from '@mui/material'
import StripMarkers from './StripMarkers'
import ReplaceFile from './ReplaceFile'
import RegionTable from './RegionTable'

const FileStuff = () => {

  return (
    <div className='flex-col space-y-5'>
        {/* <StripMarkers/> */}
        {/* <Divider/> */}
        <ReplaceFile/>
        <Divider/>
        <RegionTable/>
    </div>
  )
}

export default FileStuff