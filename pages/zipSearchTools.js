import React, {useState, useEffect} from "react"
import Header from "../components/Header"
import ZipDB from "../components/ZipDB"


export default function zipSearchTools() {
    
    const [value, setValue] = useState('one')

    // const handleChange = (event: React.SyntheticEvent,
    //     newValue) => {
    //         setValue(newValue);
    //     }
    
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen overflow-hidden'>
        <Header title="Zip Search Tools"/>
        <ZipDB/>
          
      </main>
      </>
    )
  }