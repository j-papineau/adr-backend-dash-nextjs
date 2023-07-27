import React from 'react'
import {Input, Button} from "@nextui-org/react"

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <div className='flex'>
      <Input placeholder='123 easy street'/>
      <Button color="success" size='md'>Go</Button>
    </div>
  )
}

export default SearchBar