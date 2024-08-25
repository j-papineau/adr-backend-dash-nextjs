import Header from "../components/Header"
import MapToolsTab from "../components/MapTools/MapToolsTab"


export default function MapTools() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="Map Tools"/>

        <MapToolsTab/>
        
          
      </main>
      </>
    )
  }