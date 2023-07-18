import React from 'react'
import Image from "next/image"
import loader from "./loading-loading-forever.gif"

const LoadingSpinner = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Image src={loader} alt="loading" />
    </div>
  )
}

export default LoadingSpinner
