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
    <div>
      
    </div>
  )
}

export default SearchesBar
