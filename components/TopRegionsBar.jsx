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

const TopRegionsBar = () => {

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        setChartData({
            labels: ['las-vegas', 'little-rock', 'huntsville', 'atlanta', 'long-island', 'philly', 'jax'],
            datasets: [
                {
                    label: 'Searches',
                    data: [104, 97, 43, 34, 30, 23, 11],
                    borderColor:'rgb(53,162,235)',
                    backgroundColor: 'rgb(85,47,135,0.4)'
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
        <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy'>
            <Bar data={chartData} options={chartOptions}/>
        </div>
    </>
  )
}

export default TopRegionsBar