import React, { useEffect, useState } from "react"
import { Loading } from "@nextui-org/react";


const ZipGraphs = () => {

    //I THINK GET DATA ONCE HERE
    const [isLoading, setLoading] = useState(true);

  return (
    
      <div className='w-full flex items-center justify-center  md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy dark:text-slate-100'>       
       
       {isLoading ? (<Loading type="points-opacity" size="xl">
        <p className="font-semibold text-3xl dark:text-slate-200">Graphing Data (in a cool way)... </p>
        </Loading>) : (<p>loaded</p>)}   
     </div>
    
  )
}

export default ZipGraphs
