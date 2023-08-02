import React, {useState, useEffect} from "react"
import Header from "../components/Header"
import { Box, Tab, Tabs } from "@mui/material"
import ZipSearchTools from "../components/ZipSearchTools"


export default function zipSearchTools() {
    
    const [value, setValue] = useState('one')

    // const handleChange = (event: React.SyntheticEvent,
    //     newValue) => {
    //         setValue(newValue);
    //     }
    
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header title="Zip Search Tools"/>
        <ZipSearchTools/>
          
      </main>
      </>
    )
  }