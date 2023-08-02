import React, {useEffect, useState} from 'react'
import { UserAuth } from '../context/AuthContext'
import { Image, Loading } from '@nextui-org/react';


const ProfileCard = () => {
  
    const {user, logOut, userData} = UserAuth();

    const [dataArrived, setDataArrived] = useState(false)

    useEffect(() => {

        if(userData != null){
            setDataArrived(true)
        }

    },[userData])

    return (
    <div>
        
        {(dataArrived) ? (
        <div className='flex flex-row  text-black dark:text-white px-4 p-8 m-2 items-center w-[vw]
         bg-slate-300 dark:bg-darculaBG-heavy rounded-md border'>
            <div className='p-2'>
                <Image className='rounded-sm'
                showSkeleton
                width={50}
                height={50}
                src={user.photoURL}
                alt='profile-photo'
                />
            </div>
            <div className='ml-4'>
                <h2 className='text-xl pt-2'>{user.displayName}</h2>
                <p className='text-sm italic'>{user.email}</p>
            </div>
            <div className='ml-4'>
                <h2 className='font-bold italic'>{userData.userData.team}</h2>
            </div>
        </div>
        ) : (
            <div>
                <Loading/>
                 <p className='text-black dark:text-white'>loading profile data...</p>
            </div>
        )}
            
    </div>
  )
}

export default ProfileCard