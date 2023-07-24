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

const SourcesBar = ({data}) => {

    let ordered = [];
    let orderedAmount = [];

    const [tester, setTester] = useState([])

    const [chartData, setChartData] = useState({
        datasets: []
    })

    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {

        //get top 10?
        processData()
        
        setChartData({
            labels: ordered,

            datasets:[{
                
                label: 'Searches',
                data: orderedAmount,
                borderWidth: 1,
                borderColor:'rgb(53,162,235)',
                backgroundColor: 'rgb(53, 162, 235, 0.4)'
            }]
        })
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
        })

    }, [data])

    

    function processData(){
        

        let sourcesArray = [];
        ordered = [];
        orderedAmount = [];

        setTester(data[1].sourceURL)

        for(let i = 0; i < data.length; i++){
            let currentItem = data[i].sourceURL;
            currentItem = currentItem.substring(36);
            if(currentItem === '/')
                currentItem = "home"
            sourcesArray.push(currentItem);
        }

        while(sourcesArray.length != 0){
            let count = 0;
            let current = mode(sourcesArray);
            count = sourcesArray.filter(x => x === current).length;
            sourcesArray = sourcesArray.filter(x => x !== current);
            
            orderedAmount.push(count)
            ordered.push(current)
        }

        // console.log(ordered)
        // console.log(orderedAmount)

    }

    function mode(arr){
        return arr.sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }


  return (
    <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy dark:text-slate-100'>
      <Bar data={chartData} options={chartOptions}/>
    </div>
  )
}

export default SourcesBar
