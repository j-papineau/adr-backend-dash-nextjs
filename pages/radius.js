import Header from "../components/Header"
import Error from "../components/Error"
import HaulerZipRadiusMap from "../components/HaulerZipRadiusMap"


export default function Radius() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium h-[200vh] p-4'>
        <Header  title="Radius Tool"/>

        <div className='text-black dark:text-white'>
                <p className='text-center py-4'>Note: many zips are served out of the same area, and will only be displayed as a single marker</p>
                <HaulerZipRadiusMap/>
        </div>
        
          
      </main>
      </>
    )
  }