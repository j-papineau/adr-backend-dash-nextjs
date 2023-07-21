import Header from '@/components/Header'
import ZipCards from '@/components/ZipCards'
import ZipSeachList from '@/components/ZipSeachList'
import { Card } from '@nextui-org/react'
import React from 'react'
import ZipGraphs from '@/components/ZipGraphs'

const zipSearchData = () => {
  return (
    <div className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header title="Zip Search Data"/>
        <ZipCards></ZipCards>

        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
          <ZipGraphs></ZipGraphs>
          <ZipSeachList></ZipSeachList>
        </div>
       
    </div>
  )
}

export default zipSearchData