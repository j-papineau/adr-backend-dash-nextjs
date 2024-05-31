import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'

const ThankYouGraph = ({days, doLog}) => {

    const [isLoading, setIsLoading] = useState(true);

    const [dateMax, setDateMax] = useState(null);
    const [dateMin, setDateMin] = useState(null);

    useState(() => {

        const loadData = async() => {
          if(doLog){
            console.log("logging" + days)
          }
        }
        
        setIsLoading(true);
        var currDate = new Date()
        var oldDate = currDate - 1000 * 60 * 60 * 24 * days
        setDateMax(currDate)
        setDateMin(new Date(oldDate))
        setIsLoading(false);
        loadData();

    }, [])

  return (
    <div>
        {  isLoading ? (<CircularProgress/>) : (
            <>
            <p>Date Max: {dateMax.toString()}</p>
            <p>Date Min: {dateMin.toString()}</p>
            </>
        )

        }



    </div>
  )
}

export default ThankYouGraph