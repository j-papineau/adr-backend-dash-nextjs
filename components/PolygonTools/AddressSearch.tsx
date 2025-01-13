"use client"
import { CircularProgress, Input } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import GooglePlacesAutoComplete from "react-google-places-autocomplete";
import PlacesAutocomplete from '../PlacesAutoComplete';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';


type Props = {
    value: String;
    setValue: (e: string) => void;
}

const AddressSearch = (props: Props) => {

  // const libraries = useMemo(() => ['places'], []);

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_G_KEY,
  //   libraries: libraries as Libraries
  // })

  return (
    <div>
      {/* {isLoaded && (
        <PlacesAutocomplete  onAddressSelect={(e) => props.setValue(e)}/>
      )} */}
      <PlacesAutocomplete onAddressSelect={(e) => props.setValue(e)} />
        
    </div>
  )
}

export default AddressSearch