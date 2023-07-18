import React from 'react'
import Link from 'next/link'
import {RxSketchLogo, RxDashboard, RxPerson, RxActivityLog, RxArrowTopLeft} from 'react-icons/rx'
import {AiFillTool} from 'react-icons/ai'
import {FiSettings} from 'react-icons/fi'
import Image from 'next/image'


const Sidebar = ({children}) => {
  return (
    <div className='flex'>
        <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
            <div className='flex flex-col items-center'>
                <Link href='/'>
                      <Image src="/images/adrlogo.png"
                      width={100}
                      height={90}
                      alt="ADR-logo"/>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                {/*Items in sidebar*/}
                <Link href='/'>
                    <div className='bg-gray-900 hover:bg-gray-200 cursor-pointer m-4 text-white p-3 rounded-lg inline-block'>
                      <RxDashboard size={20}/> 
                    </div>
                </Link>
                <Link href='/profile'>
                    <div className='bg-gray-900 hover:bg-gray-200 cursor-pointer m-4 text-white p-3 rounded-lg inline-block'>
                      <RxPerson size={20}/> 
                    </div>
                </Link>
                <Link href='/tools'>
                    <div className='bg-gray-900 hover:bg-gray-200 cursor-pointer m-4 text-white p-3 rounded-lg inline-block'>    
                    <AiFillTool size={20}/>
                    </div>
                </Link>
                <Link href='/settings'>
                    <div className='bg-gray-900 hover:bg-gray-200 cursor-pointer m-4 text-white p-3 rounded-lg inline-block'>
                      <FiSettings size={20}/> 
                    </div>
                </Link>
            </div>
        </div>
        <main className='ml-20 w-full'>{children}</main>
    </div>
  )
}

export default Sidebar