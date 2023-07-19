import React from 'react'
import { Divider } from 'antd'
import { UserAuth } from '@/context/AuthContext'
import Image from 'next/image'
import { Dropdown, Avatar, Text } from '@nextui-org/react'



const Header = (props) => {

  let title = props.title;

  const {user, logOut} = UserAuth();

  const userNames = user.displayName.split(" ");

  console.log(user);

  const handleSignOut = async () => {
    try{
      await logOut();
      console.log("logging out")
    }catch (error){
      console.log(error);
    }
  }
  

  return (
    <div>
      <div className='flex flex-row justify-between px-4 pt-4'>
        <div className='flex justify-center items-center'>
          <h2 className="font-semibold text-black">{title}</h2>
        </div>
        <div className='flex justify-center items-center'>
          <h2 className='text-black italic p-2'>Welcome Back, {userNames[0]}</h2>
          <div className='flex'>
            <Dropdown placement='bottom-left'>
            <Dropdown.Trigger>
              <Avatar
                bordered
                size="lg"
                as="Button"
                color="primary"
                src={user.photoURL}/>
            </Dropdown.Trigger>
            <Dropdown.Menu color="secondary" aria-label="avatar menu">
              <Dropdown.Item key="profile" css={{height: "$18"}}>
                <Text b color="inherit" css={{d:"flex"}}>
                  Signed in to:
                </Text>
                <Text className="text-xs" b color="inherit" css={{d:"flex"}}>
                  {user.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item color="error" key="logout" withDivide>
                <p onClick={handleSignOut}>
                <Text b color="inherit" css={{d:"flex"}}>Sign Out</Text>
                </p>
              </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>  
      </div>
      <Divider></Divider>
    </div>
  )
}

export default Header
