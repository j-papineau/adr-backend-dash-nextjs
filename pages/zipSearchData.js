import Header from '@/components/Header'
import ZipCards from '@/components/ZipCards'
import { Card } from '@nextui-org/react'
import React from 'react'

const zipSearchData = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <Header title="Zip Search Data"/>
        <ZipCards></ZipCards>
    </div>
  )
}

export default zipSearchData