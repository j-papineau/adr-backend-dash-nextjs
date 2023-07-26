import React from 'react'
import { Input, Button } from '@nextui-org/react'

const MapSearchBar = ({lat, lng}) => {

    function submit(){
        console.log()
    }


  return (
    <div className='text-black dark:text-white flex-col'>
      
      <div className='flex'>
        <Input placeholder='33619' label='Search:' className='text-white'/>
        <Button className='pl-4' size="md" color="success" onPress={submit}>Go</Button>
      </div>
      
    </div>
  )
}

export default MapSearchBar
