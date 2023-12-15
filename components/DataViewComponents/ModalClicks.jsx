import React, {useEffect, useState} from 'react'
import { supabase } from '../../supabase/supabase'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);


const ModalClicks = () => {

    const [chartData, setChartData] = useState({
        datasets: []
    })

    let dataCounts = []

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {

        const fetchData = async () => {
            var count = await supabase.from("zip_search_tracking").select('*', { count: 'exact', head: true}).eq('clicked', true)
            dataCounts.push(count.count)
            var count = await supabase.from("zip_search_tracking").select('*', { count: 'exact', head: true}).eq('clicked', false)
            dataCounts.push(count.count)

            setChartData({
                labels: ["redirected", "stayed on page"],
    
                datasets: [{
                    label: 'Clicks',
                    data: dataCounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'],
                    borderWidth: 1,
                    borderColor:'rgb(53,162,235)',
                    backgroundColor: 'rgb(53, 162, 235, 0.4)'
                }]
            });
    
            setChartOptions({
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: "Sources"
                    }
                },
                maintainAspectRatio: false,
                responsive: true
            });
            
        }

        fetchData();
        
        


    },[])

  return (
    <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy dark:text-slate-100'>
      <Pie data={chartData} options={chartOptions}/>
    </div>
  )
}

export default ModalClicks