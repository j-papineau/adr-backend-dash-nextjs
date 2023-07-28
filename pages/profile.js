import React from 'react'
import Header from '@/components/Header'
import ProfileSettings from '@/components/ProfileSettings'
import ProfileCard from '@/components/ProfileCard'

const Profile = () => {
  return (
    <div className='bg-gray-100 dark:bg-darculaBG-medium min-h-screen'>
      <Header title="Profile"/>
      <ProfileCard/>
      <ProfileSettings/>
    </div>
  )
}

export default Profile

