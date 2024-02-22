'use client'
import React from 'react'
import Header from '../components/Header'
import MainPricing from '../components/PricingComponents/MainPricing'

const PricingByArea = () => {
  return (
    <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="Pricing By Area"/>
          <MainPricing/>
        
        
          
      </main>
      </>
  )
}

export default PricingByArea