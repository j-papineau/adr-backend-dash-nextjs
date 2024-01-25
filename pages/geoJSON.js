'use client'
import Header from "../components/Header"
import JsonConverter from "../components/mapStuff/JsonConverter"
import MapStuff from "../components/mapStuff/MapStuff"
import KmlUpload from "../components/mapStuff/kmlUpload"


export default function geoJSON() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="Map File Editor"/>

        <MapStuff/>

       
        
          
      </main>
      </>
    )
  }