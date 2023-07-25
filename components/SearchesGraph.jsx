import React, {useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import { FaTools } from 'react-icons/fa';
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

const SearchesBar = ({data}) => {

    const [chartData, setChartData] = useState({
        datasets: []
    })

    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {

        //get top 10?



    }, [data])

    function processData(){

      

    }


  return (
    <div className='flex text-3xl text-black dark:text-white'>
      <FaTools className='m-4'/>
      <p className='p-4'>still in progress, try other tab</p>
    </div>
  )
}

export default SearchesBar
