import React, { useState } from 'react'
import AddressSearch from './AddressSearch';
import { Button, Slider, Switch } from '@mui/material';

type Props = {}

const ByRadius = (props: Props) => {
    const [selectedAddress, setSelectedAdress] = useState<String>("");
    const [radius, setRadius] = useState<number>(50);
    const [isDrivingRadius, setIsDrivingRadius] = useState<boolean>(false);

    const handleButtonClick = () => {
      console.log(selectedAddress);
    }

  return (
    <div className='flex flex-col space-y-2'>
        <p>Address</p>
        <AddressSearch value={selectedAddress} setValue={setSelectedAdress}/>
        <p>Radius</p>
        <div className='flex flex-row space-x-2 items-center'>
            <Slider min={1} max={500} sx={{width: '200px'}} value={radius} onChange={(e, val) => setRadius(val as number)}/>
            <p>{radius} miles</p>
        </div>
        <p>Type</p>
        <div className='flex flex-row space-x-2 italic items-center'>
            <Switch value={isDrivingRadius} onChange={() => setIsDrivingRadius(!isDrivingRadius)}/>
            {isDrivingRadius ? (<p>Driving Radius</p>) : (<p>As the crow flies</p>)}
        </div>
        <div>
          <Button onClick={handleButtonClick} variant='contained'>Go</Button>
        </div>

    </div>
  )
}

export default ByRadius