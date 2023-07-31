import React from 'react'
import { MdWarning } from 'react-icons/md'

const NoPrivs = ({errorText, errorCaption}) => {
  return (
    <div className='flex flew-col justify-center items-center my-auto h-screen'>
        <div className='flex flex-col items-center justify-center'>
         <MdWarning className='text-6xl text-yellow-500'/>
         <h2 className='text-xl text-slate-500 tracking-wider'>{errorText}</h2>
         <p className='italic text-slate-500'>{errorCaption}</p>
        </div>
        
    </div>
  )
}

export default NoPrivs