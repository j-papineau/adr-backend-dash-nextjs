import AdrMap from "@/components/AdrMap"
import Header from "@/components/Header"
import { ReactDOM } from "react"




export default function Spencer() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="Bins Quote Tool"/>

        <div>
            <AdrMap/>
        </div>
        
          
      </main>
      </>
    )
  }