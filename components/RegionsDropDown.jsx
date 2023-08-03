import React, {useEffect, useState} from 'react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
  } from "@nextui-org/dropdown";
  import { Button, Loading } from '@nextui-org/react';

const RegionsDropDown = () => {

    // const items = [
    //       {
    //         key: "new",
    //         slug: "New file",
    //       },
    //       {
    //         key: "copy",
    //         slug: "Copy link",
    //       },
    //       {
    //         key: "edit",
    //         slug: "Edit file",
    //       },
    //       {
    //         key: "delete",
    //         slug: "Delete file",
    //       }
    // ]

    const [items, setItems] = useState([ {slug: "tampa"}])
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getDropdownItems()
    })

    async function getDropdownItems(){
        const response = await fetch("https://adrstagingreal.wpengine.com/Joel-Dash/php/regions-dropdown.php")
        const data = await response.json();
        setItems(data)
        setLoading(false)

    }   



  return (
  <div>

{isLoading ? (<Loading/>) : (
    <Dropdown backdrop='blur'>
    <DropdownTrigger>
      <Button 
        variant="bordered" 
      >
        Select Region
      </Button>
    </DropdownTrigger>
    <DropdownMenu  aria-label="Dynamic Actions" className='bg-white p-4 h-[25vh] overflow-y-scroll' items={items}>
      {(item) => (
        <DropdownItem
          key={item.slug}
        >
          {item.slug}
        </DropdownItem>
      )}
    </DropdownMenu>
  </Dropdown>
  )}
  </div>
  )
}


export default RegionsDropDown