import React from 'react'

const NiceNumberCard = ({titleText, numberText}) => {
  return (
    <div className='shadow-lg border rounded-sm p-2 items-center text-center'>
        <p className='italic text-xl font-semibold'>{titleText}</p>
        <p className='text-lg'>{numberText}</p>
    </div>
  )
}

export default NiceNumberCard