import React, {useState, useRef} from "react"
import Header from "../components/Header"
import { UserAuth } from "../context/AuthContext"
import Error from "../components/Error"
import UserList from "../components/UserList"
import SegmentedControl from "../components/SegmentedControl"



export default function admin() {
    
    const {isAdmin} = UserAuth()
    const[selectedTab, setSelectedTab] = useState("users")

    if(!isAdmin){
        return (
            <>
                <Error errorText={"You do not have permission to view this page"}
                errorCaption={"If you are an administrator contact the dev team to check privileges"}/>
            </>
        )
    }else{

    return (
         <>
            
        <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
            <Header  title="Admin Panel"/>
            
            <SegmentedControl 
            name="controller"
            callback={(val) => setSelectedTab(val)}
            defaultIndex={0}
            controlRef={useRef()}
            segments={[
                {
                    label: 'Users',
                    value: 'users',
                    ref: useRef(),
                },
                {
                    label: 'Server Status',
                    value:'status',
                    ref: useRef(),
                },
                {
                    label: 'Dev Access',
                    value:'devaccess',
                    ref: useRef(),
                },
            ]}
            />

            {
                (selectedTab === 'users') && <UserList/>
            }
            {
                (selectedTab === 'status') && <Error errorText={"Server Page not made yet"}/>
            }
            {
                (selectedTab === 'devaccess') && <Error errorText={"Dev Page not made yet"}/>
            }
           
            
              
              
                
        </main>
        </>
      )

    }

    
  }