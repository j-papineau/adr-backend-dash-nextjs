import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export function SearchUsage( {rawData} ) {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Usage by Week',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const [graphData, setGraphData] = useState({
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [1,2,3,4,5,4,3,2],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          
        ],
      })

      
      
      useEffect(() => {
        
        processData();


      }, [rawData])

      function processData(){
        let labels = getLabels()
        let labelsAsDates = getLabelsAsDates()
        let processedData = getData(labelsAsDates)

        setGraphData({
            labels,
            datasets: [
                {
                    label: 'Proper Data' ,
                    data: processedData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',

                },
            ]
        })
      }

      function getData(dates){

        let dataset = []

        for(let i = 0; i < dates.length - 1; i++){
            const startDate = dates[i]
            const endDate = dates[i + 1]

            var filteredData = rawData.filter(item => {
                const currentDate = new Date(item.date)
                return currentDate >= startDate && currentDate < endDate
            })

            dataset.push(filteredData.length)
        }

        const startDate = dates[dates.length - 1]
        var filteredData = rawData.filter(item => {
            const currentDate = new Date(item.date)
            return currentDate >= startDate
        })

        dataset.push(filteredData.length)

        return dataset
        

      }

      function getLabels(){
        
        let labels = []
        var options = {day: 'numeric', month: 'numeric', year: 'numeric'}
        let currentDate = new Date()
        let count = 1
        labels.push(currentDate.toLocaleDateString("en-US", options));

        for(let i = 0; i < 10; i++){
            let newDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
            labels.push(newDate.toLocaleDateString("en-US", options));
            currentDate = newDate;
        }

        labels = labels.reverse()

        return labels
      }

      function getLabelsAsDates(){

        let dates = []

        let currentDate = new Date()
        let count = 1
        dates.push(currentDate)

        for(let i = 0; i < 10; i++){
            let newDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
            dates.push(newDate)
            currentDate = newDate
        }

        dates = dates.reverse()

        return dates


      }


  return (
    <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy dark:text-slate-100'>
        <Line options={options} data={graphData} />
    </div>
  
  )
}

export default SearchUsage
