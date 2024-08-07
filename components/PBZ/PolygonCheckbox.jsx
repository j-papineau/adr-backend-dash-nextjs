import React, {useState, useEffect} from 'react'
import { Checkbox } from '@mui/material'

const PolygonCheckbox = ({selectedPoly, attribute}) => {

    const [isChecked, setIsChecked] = useState(null);

    useEffect(() => {
        if(selectedPoly.properties[{attribute}] === 'yes'){
            setIsChecked(true);
        }else{
            setIsChecked(false);
        }
    }, [selectedPoly])


  return (
    <Checkbox checked={isChecked} onChange={(e) => {
        setIsChecked(!isChecked);
        if(isChecked){
            selectedPoly.properties[{attribute}] = "yes"
        }else{
            selectedPoly.properties[{attribute}] = "no"
        }
        
    }}/>
  )
}

export default PolygonCheckbox