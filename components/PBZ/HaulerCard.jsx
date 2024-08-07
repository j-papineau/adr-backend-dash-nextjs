import React from 'react'

const HaulerCard = ({name}) => {
  return (
    <div className='rounded-md bg-blue-300 p-5 capitalize'>
        <p className='font-bold'>{name}</p>
    </div>
  )
}

export default HaulerCard