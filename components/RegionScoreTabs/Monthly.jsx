import React, { useEffect, useState } from 'react'
import { Select, Typography, Divider, FormControl, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText, CircularProgress, Button} from '@mui/material'
import { supabase } from '../../supabase/supabase';

const Monthly = () => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
      ];

    const [selectedMonths, setSelectedMonths] = useState([])
    const [selectLoading, setSelectLoading] = useState(true)
    const [datasets, setDatasets] = useState([])

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedMonths(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const getMonths = async () => {
            const {data} = await supabase.from("region_score_data").select("id, dataset_name").eq("period", "month")
            setDatasets(data)
            setSelectLoading(false)
        }

        getMonths();
    }, [])

  return (
    <div className='flex flex-col h-[90vh] w-[1000px] p-2'>
        <div className='flex flex-row space-x-4 items-center'>
            { selectLoading ? (<CircularProgress/>) : (
                <>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="months-label">Months</InputLabel>
                    <Select
                        labelId='months-label'
                        multiple
                        value={selectedMonths}
                        onChange={handleChange}
                        input={<OutlinedInput label="tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {datasets.map((item) => (
                            <MenuItem key={item.id} value={item.dataset_name}>
                                <Checkbox checked={selectedMonths.indexOf(item.dataset_name) > -1} />
                                <ListItemText primary={item.dataset_name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </>
            )}
            <Button className='h-[50px]' variant='contained'>Run Report</Button>
        </div>
        <Divider/>
    </div>
  )
}

export default Monthly