import { Input, FormControl, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/supabase'

const RowEditModal = ({row, handleClose, refreshTable}) => {
  
  useEffect(() => {
    setTempRow(row.row)
  }, [])
  
    const [tempRow, setTempRow] = useState({})

    const updateDataset = async () => {
        const {error} = await supabase.from("region_score_data").update({
            start_date: tempRow.start_date,
            end_date: tempRow.end_date,
            dataset_name: tempRow.dataset_name
        }).eq('id', tempRow.id)

        refreshTable();
        handleClose();
    }

    //PERMANENTLY DELETES ROW
    const deleteDataset = async () => {
        let res = confirm("Delete Dataset " + tempRow.dataset_name)
        if (!res)
            return
        
        const {error} = await supabase.from("region_score_data").delete().eq('id', tempRow.id)

        refreshTable();
        handleClose();
    }

    return (
    <div className='flex flex-row justify-evenly'>
        <FormControl className='flex flex-col space-y-4'>
            <TextField value={tempRow.dataset_name} label='Name' onChange={(e) => {
                setTempRow({...tempRow, dataset_name: e.target.value})
            }}/>
            <TextField label='start' type='date' value={tempRow.start_date} onChange={(e) => {
                setTempRow({...tempRow, start_date: e.target.value})
            }}/>
            <TextField label='end' type='date' value={tempRow.end_date} onChange={(e) => {
                setTempRow({...tempRow, end_date: e.target.value})
            }}/>
            <p>Period: {tempRow.period}</p>
            
        </FormControl>

        <div className='flex flex-col space-y-4'>
            <Button variant='contained' onClick={(e) => {
                console.log(tempRow)
            }}>Test</Button>
            <Button variant='contained' color='success' onClick={updateDataset}>Update Dataset</Button>
            <Button variant='contained' color='error' onClick={deleteDataset}>Delete Dataset</Button>
        </div>
    </div>
  )
}

export default RowEditModal