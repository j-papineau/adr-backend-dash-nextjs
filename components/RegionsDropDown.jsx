import React, {useEffect, useState} from 'react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
  } from "@nextui-org/dropdown";
  import { Button, Loading } from '@nextui-org/react';

const RegionsDropDown = ({ setSelectedRegion }) => {

    const [items, setItems] = useState({})
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
  <div>
    <Dropdown backdrop='blur'>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Select Region
        </Button>
      </DropdownTrigger>
      <DropdownMenu  closeOnSelect aria-label="Dynamic Actions" variant='faded' className='bg-white h-[25vh] overflow-y-scroll' items={items} 
      onAction={(e) => {
        let slug = "no slug found"
        items.forEach(element => {
          if(element.zip === e)
            slug = element.slug
        });

        setSelectedRegion({zip: e, slug:slug})

      }}>
        {(item) => (
          <DropdownItem
            key={item.zip}
          >
            {item.slug}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  </div>
   
  )}
  </div>
  )
}


export default RegionsDropDown