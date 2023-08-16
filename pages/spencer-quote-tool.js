import SpencerGoogleSheet from "../components/SpencerGoogleSheet"
import AdrMap from "../components/AdrMap"
import Header from "../components/Header"
import SpencerMap from "../components/SpencerMap"
import { ReactDOM } from "react"




export default function Spencer() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="Bins Quote Tool"/>

        <div>
            <SpencerMap/>
        </div>
        
          
      </main>
      </>
    )
  }