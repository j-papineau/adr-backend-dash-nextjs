import { Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'


const History = () => {

    useEffect(() => {

        const fetchUsers = async () => {

        }

        const fetchUsageData = async () => {

        }

        fetchUsers();

    }, [])



  return (
    <div className='flex flex-col space-y-2'>
        <Typography variant='h5'> Usage History </Typography>
        <Divider/>
    </div>
  )
}

export default History