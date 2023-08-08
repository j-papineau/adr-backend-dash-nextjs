import React, {useEffect, useState} from 'react'
import { GoogleSpreadsheet } from 'google-spreadsheet'






const SpencerGoogleSheet = () => {
  
  
    async function sheetHandler(){

       
    }
    
    useEffect(() => {
    
        sheetHandler()
    
    
    }, [])




  
    return (
    <div className='h-screen'>
        SpencerGoogleSheet
    </div>
  )
}

export default SpencerGoogleSheet