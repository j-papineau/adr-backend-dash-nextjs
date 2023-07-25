
import Header from "@/components/Header"
import dynamic from "next/dynamic"
import AdrMap from "@/components/AdrMap"




export default function adrmap() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen overflow-x-hidden overflow-y-scroll '>
        <Header  title="ADR Map"/>

        
            
        <AdrMap/>
           
        
       
         
        
          
      </main>
      </>
    )
  }