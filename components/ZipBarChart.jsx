import React, {useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ZipBarChart = () => {

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        setChartData({
            labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Searches',
                    data: [1 ,23, 32, 10, 19, 20, 38],
                    borderColor:'rgb(53,162,235)',
                    backgroundColor: 'rgb(53, 162, 235, 0.4)'
                }
                    
            ]
        })
        setChartOptions({
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Zip Searches"
                }
            },
            maintainAspectRatio: false,
            responsive: true
        })
    }, [])

  return (
    <>
        <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy dark:text-slate-100'>
            <Bar data={chartData} options={chartOptions}/>
        </div>
    </>
  )
}

export default ZipBarChart