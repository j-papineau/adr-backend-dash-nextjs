
import Header from "../components/Header"
import MapStuff from "../components/mapStuff/MapStuff"



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