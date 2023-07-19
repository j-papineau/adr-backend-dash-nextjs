import React from 'react'
import { Divider } from 'antd'
import { UserAuth } from '@/context/AuthContext'

const Header = () => {

  const {user} = UserAuth();

  return (
    <div className='flex justify-between px-4 pt-4'>
      <h2 className="font-semibold text-black">ADR Backend</h2>
      <h2 className='text-black italic'>Welcome Back, {user.displayName}</h2>
    </div>
  )
}

export default Header
