import React from 'react'
import { Typography, Card, CardActions, CardContent, Button, Box, Tooltip} from '@mui/material'
import {FaArrowCircleUp, FaArrowCircleDown} from "react-icons/fa"
import { IoIosHelpCircleOutline } from "react-icons/io";



const AvgCard = ({obj}) => {

    const scoreGood = (obj.score >= 50) 
    const ctlGood = (obj.click_to_lead >= 28) 
    const cplGood = (obj.cost_per_lead <= 22)
    const closingGood = (obj.closing_rate >= 32.5)
  return (
    <div className='flex flex-row'>
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <div className='flex flex-row justify-between'>
            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              All Regions ({obj.name})
            </Typography>
            <Tooltip title={"CtL: 28%, Prof: $200, CpL: $22, Closing: 32.5% "}>
                <Button size={"small"}>Targets</Button>
            </Tooltip>  
        </div>

        <div>
          <Typography variant='p' color="text.secondary">
            Average Score
          </Typography>
          <div className='flex flex-row'>
              <Typography variant="p" component="div" className={scoreGood ? "text-green-500" : "text-red-500"}>
                {Math.round(100 * obj.score)/100}
              </Typography>
          </div>
        </div>
        <div>
          <Typography color="text.secondary">
            Average CtL
          </Typography>
          <div className='flex flex-row space-x-4 items-center'>
              <Typography variant="p" component="div" className={ctlGood ? "text-green-500" : "text-red-500"}>
                {Math.round(100 * obj.click_to_lead)/100}%
              </Typography>
              {
                  ctlGood ? (<>
                      <FaArrowCircleUp/>
                      <Typography variant='p'></Typography>
                  </>) : (
                      <>
                      <FaArrowCircleDown/>
                      </>
                  )
              }
              <p className='text-black text-xs'>{(Math.round(100 * (obj.click_to_lead - 28)) / 100)} from Target</p>
          </div>
        </div>

        <Typography color="text.secondary">
          Average CpL
        </Typography>
        <div className='flex flex-row space-x-4 items-center'>
            <Typography variant="p" component="div" className={cplGood ? "text-green-500" : "text-red-500"}>
              {Math.round(100 * obj.cost_per_lead)/100}$
            </Typography>
            {
                cplGood ? (<>
                    <FaArrowCircleUp/>
                    <Typography variant='p'></Typography>
                </>) : (
                    <>
                    <FaArrowCircleDown/>
                    </>
                )
            }
            <p className='text-black text-xs'>{(Math.round(100 * (obj.cost_per_lead - 22)) / 100)} from Target</p>
        </div>

        <Typography color="text.secondary">
          Average Closing
        </Typography>
        <div className='flex flex-row space-x-4 items-center'>
            <Typography variant="p" component="div" className={closingGood ? "text-green-500" : "text-red-500"}>
              {Math.round(100 * obj.closing_rate)/100}%
            </Typography>
            {
                closingGood ? (<>
                    <FaArrowCircleUp/>
                    <Typography variant='p'></Typography>
                </>) : (
                    <>
                    <FaArrowCircleDown/>
                    </>
                )
            }
            <p className='text-black text-xs'>{(Math.round(100 * (obj.closing_rate - 32.5)) / 100)} from Target</p>
        </div>


        
        
      </CardContent>
    </Card>
    </div>
  )
}

export default AvgCard