import React from 'react'
import { LineChart } from '@mui/x-charts'

const MetricTrendGraph = () => {
  return (
    <LineChart
    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          data: [0, 1, 5, 4, 2, 7]
        },
      ]}
      width={500}
      height={300}/>
  )
}

export default MetricTrendGraph