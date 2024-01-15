import Header from "../components/Header"
import JsonConverter from "../components/jsonProcessor/JsonConverter"


export default function geoJSON() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="Geo JSON Editor"/>

        <JsonConverter/>
        
          
      </main>
      </>
    )
  }