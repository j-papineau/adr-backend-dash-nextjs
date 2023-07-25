
import Header from "@/components/Header"
import dynamic from "next/dynamic"

const AdrMap = dynamic(() => import('@/components/AdrMap'),
{ssr: false})


export default function adrmap() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen overflow-x-hidden overflow-y-scroll '>
        <Header  title="ADR Map"/>

        
            <AdrMap className='h-screen w-screen'/>
        
           
        
       
         
        
          
      </main>
      </>
    )
  }