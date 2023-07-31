import React, {useEffect, useState} from 'react'
import {auth, db} from '../firebase'
import { DocumentSnapshot, Firestore, addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import SegmentedControl from './SegmentedControl'
import { Divider } from 'antd'



const UserList = () => {
  
  
  
    return (
    <div>
        <h1 className='text-3xl text-black dark:text-white ml-5 mb-2'>Users</h1>
        <Divider className='bg-slate-800 dark:bg-white'/>
        <div className=' h-[65vh] overflow-y-scroll w-full'>

        </div>
        {/* <div className='flex flex-row  text-black dark:text-white h-[70vh] w-[80%] ml-5
         bg-slate-300 dark:bg-darculaBG-heavy rounded-md border overflow-y-scroll'>
            
        </div> */}
    </div>
  )
}

export default UserList