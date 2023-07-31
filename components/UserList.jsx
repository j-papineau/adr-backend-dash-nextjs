import React, {useEffect, useState} from 'react'
import {auth, db} from '../firebase'
import { DocumentSnapshot, Firestore, addDoc, collection, doc, getDocs, setDoc, firebase, firestore, onSnapshot} from 'firebase/firestore'
import SegmentedControl from './SegmentedControl'
import { Divider } from 'antd'
import { Button, Loading } from '@nextui-org/react'
import UserListItem from './UserListItem'



const UserList = () => {
  
   
   
    const [userListData, setUserListData] = useState({})
    const [isLoading, setLoading] = useState(true);


    useEffect(() => { 

        getAllUsers()


    }, [])

   async function getAllUsers(){
        
        let users = []
        const querySnap = await getDocs(collection(db, "Users"));
        querySnap.forEach((doc) => {
            users.push(doc.data())
        })
        setUserListData(users);
        //console.log(users)
        setLoading(false);

    }

    function openEditModal(user){
        console.log(user);
    }

    function refreshList(){
        setLoading(true)
        getAllUsers();
    }
  
  
    return (
    <div>
        <div className='flex flex-row justify-evenly items-center pt-5'>
         <h1 className='text-3xl text-black dark:text-white ml-5 mb-2'>Users</h1>
         <Button size="sm" onPress={refreshList}>Refresh</Button>
        </div>
        
        <Divider className='bg-slate-800 dark:bg-white'/>
        {isLoading ? (
            <div className='justify-evenly items-center flex '>
                <Loading/>
            </div>
        
        ) : (
             <div className=' h-[65vh] overflow-y-scroll w-full'>
                {userListData.map((item, id) => (
                    <li key={id} className='cursor-pointer h-20 list-none'>
                        <UserListItem user={item} openEditModal={openEditModal} refreshList={refreshList}/>
                    </li>
                )) }
             </div>
            
        )}
       
        {/* <div className='flex flex-row  text-black dark:text-white h-[70vh] w-[80%] ml-5
         bg-slate-300 dark:bg-darculaBG-heavy rounded-md border overflow-y-scroll'>
            
        </div> */}
    </div>
  )
}

export default UserList