import React, {useEffect, useState} from 'react'
import { Divider } from 'antd'
import { UserAuth } from '../context/AuthContext'
import Image from 'next/image'
import { Dropdown, Avatar, Text, useAsyncList } from '@nextui-org/react'






const Header = (props) => {

  let title = props.title;

  const {user, logOut, userData} = UserAuth();

 

  const userNames = user.displayName.split(" ");

  // const teamName = userData.userData.team;
  const [teamName, setTeamName] = useState("")

  //console.log(user);

  const handleSignOut = async () => {
    try{
      await logOut();
      console.log("logging out")
    }catch (error){
      console.log(error);
    }
  }

  useEffect(() => {

    if(userData != null){
     
      //console.log(userData)
      setTeamName(userData.userData.team)
    }
     

  }, [userData])
  

  return (
    <div className='items-center'>
      <div className='flex flex-row justify-between px-4 pt-4 items-center'>
        <div className='flex justify-center items-center'>
          <h2 className="font-semibold text-black dark:text-slate-300">{title}</h2>
        </div>
        <div className='flex justify-center items-center'>
          <div className='mr-4 mt-3'>
           <h2 className='text-black  dark:text-slate-300'>Welcome Back, {userNames[0]}</h2>
           <p className='text-black text-sm dark:text-slate-300 italic'>{teamName}</p>
          </div>
          
          <div className='flex'>
            <Dropdown placement='bottom-left'>
            <Dropdown.Trigger>
              <Avatar
                bordered
                size="lg"
                as="button"
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
      <Divider className='bg-black dark:bg-slate-200'></Divider>
    </div>
  )
}

export default Header
