import { CircularProgress, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { supabase } from "/supabase/supabase.js"
import { auth, db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import PBZUserCard from './PBZUserCard'



const History = () => {

  const [userListData, setUserListData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userObjsF, setUserObjsF] = useState({});
  const [finalArr, setFinalArr] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
          //get user list
            let users = []
            const query = await getDocs(collection(db, "Users"));
            query.forEach((doc) => {
              users.push({
                  id: doc.id,
                  data: doc.data(),
                })
              })


            let userObjs = {};

            users.forEach((item) => {
              userObjs[item.id] = {
                name: item.data.userData.name,
                searches: 0
              }
            })

            const {data, error} = await supabase.from('zip_tool_history').select();

            data.forEach((x) => {
              userObjs[x.user].searches = userObjs[x.user].searches + 1;
            })
            
           

            const final = Object.keys(userObjs).map((key) => ({
              id: key,
              ...userObjs[key],
            }));

            console.log(final)
            setUserObjsF(final);

            setIsLoading(false);
        }

        

        fetchUsers();
        

    }, [])



  return (
    <div className='flex flex-col space-y-2'>
        <Typography variant='h5'> Usage History </Typography>
        <Divider/>
        <div>
          {isLoading ? (<CircularProgress/>) : (
              <div className='space-y-2'>
                {userObjsF.map((item, i) => {
                  if(item.searches > 0){
                    return <div className='p-2 flex flex-row space-x-4 bg-slate-200 drop-shadow-md rounded-md'>
                    <p className='font-bold'>{item.name}</p>
                    <p>{item.searches} searches</p>
                    </div>
                  }
                  
                })}
              
              </div>
            
          )}
        </div>
    </div>
  )
}

export default History