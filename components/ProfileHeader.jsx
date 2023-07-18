import React from 'react'
import { Divider } from 'antd'

const ProfileHeader = () => {
  return (
    <div>
        <div className='flex justify-between px-4 pt-4'>
        <h2 className="font-semibold text-black">Profile</h2>
        <h2 className='text-black italic'>Welcome Back, Joel</h2>
        </div>
    <Divider></Divider>
    </div>
    
  )
}

export default ProfileHeader
