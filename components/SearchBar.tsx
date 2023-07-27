import React, {useState} from 'react'
import {Input, Button} from "@nextui-org/react"
import { StandaloneSearchBox } from '@react-google-maps/api'



type Props = {}

const SearchBar = () => {

  const [address, setAddress] = useState("");

  


  return (
    <div className='flex'>
      <Input placeholder='123 easy street' />
      <Button color="success" size='md'>Go</Button>
    </div>
  )
}

export default SearchBar