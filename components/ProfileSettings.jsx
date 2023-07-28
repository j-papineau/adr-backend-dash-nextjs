import React from 'react'
import { UserAuth } from '@/context/AuthContext'
import { Card } from '@nextui-org/react'

const ProfileSettings = () => {

    const{user, userData} = UserAuth()
  return (
    <div className='grid lg:grid-cols-5 gap-4 p-4'>
        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black dark:text-slate-200'>
                
            </div>
           
        </div>
        <div className='lg:col-span-2 col-span-1 bg-white dark:bg-darculaBG-heavy flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black dark:text-slate-200'>
                
            </div>
            
        </div>
        <div className='bg-white dark:bg-darculaBG-heavy flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4 text-black dark:text-slate-200'>
                
            </div>
            
        </div>
    </div>
  )
}

export default ProfileSettings