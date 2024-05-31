import { CircularProgress } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { supabase } from "supabase/supabase"
import { DataGrid } from '@mui/x-data-grid';
import { setDisplayName } from 'recompose';

const ThankYouGraph = ({days, doLog}) => {

    const [isLoading, setIsLoading] = useState(true);

    const [dateMax, setDateMax] = useState(null);
    const [dateMin, setDateMin] = useState(null);

    const [rows, setRows] = useState([])

    // const [viewData, setViewData] = useState(null);
    // const [clickData, setClickData] = useState(null);

    useEffect(() => {

        const processData = (data) => {
          return data.reduce((acc, item) => {
            if(!acc[item.regionID]){
              acc[item.regionID] = 0;
            }
            acc[item.regionID]++;
            return acc;
          }, {});
        }

        const loadViews = async() => {
          var dateMin = new Date(new Date() - 1000 * 60 * 60 * 24 * days)
          const {data, error} = await supabase.from("ty_page_views").select().gte("created_at", formatDate(dateMin));
          return data;
        }

        const loadClicks = async() => {
          var dateMin = new Date(new Date() - 1000 * 60 * 60 * 24 * days)
          const {data, error} = await supabase.from("ty_page_clicks").select().gte("created_at", formatDate(dateMin));
          return data;
        }

        const loadRegions = async() => {
          const {data, error} = await supabase.from("region_info").select("regionID, name")
          return data
        }

        const dataFix = async(clickData, viewData, regions) => {
        
          const viewCount = processData(viewData);
          const clickCount = processData(clickData);
          const mergedData = regions.map(region => ({
            regionID: region.regionID,
            name: region.name,
            views: viewCount[region.regionID] || 0,
            clicks: clickCount[region.regionID] || 0
          }))

          setRows(mergedData);
        }

        const loadData = async() => {
          await dataFix(await loadViews(), await loadClicks(), await loadRegions());
        }
        
        setIsLoading(true);
        loadData();
        setIsLoading(false);
        

        // setIsLoading(false);

    }, [])

    const cols = [
      {field: 'regionID', headerName: 'regionID', width:120},
      {field:'name', headerName: 'Name', width:120},
      {field: 'clicks', headerName: 'Views', width:120},
      {field: 'views', headerName: 'Clicks', width:120}
    ]

    function formatDate(date){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

  return (
    <div className='w-full h-full bg-white'>
        {  isLoading ? (<CircularProgress/>) : (
            <>
             <DataGrid
             getRowId={(row) => row.regionID}
             autoHeight
             columns={cols}
             rows={rows}
             initialState={{
              pagination: {
                  paginationModel: {
                      pageSize: 10,
                  },
              },
              sorting: {
                sortModel: [{field: 'clicks', sort: 'desc'}],
              }
            }}
            pageSizeOptions={[5,10,15]}
            />
            </>
        )

        }



    </div>
  )
}

export default ThankYouGraph