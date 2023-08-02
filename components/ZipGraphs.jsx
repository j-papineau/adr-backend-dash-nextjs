import React, { useEffect, useState, useRef } from "react"
import { Loading } from "@nextui-org/react";
import SegmentedControl from "./SegmentedControl";
import { Divider } from "antd";
import SearchesGraph from "./SearchesGraph";
import SourcesBar from "./SourcesBar";
import ZipSearchMap from "./ZipSearchMap";
import Error from "./Error";
import SearchUsage from "./SearchUsage";


const ZipGraphs = ({rawData, data, isLoading}) => {

  const[selectedValue1, setSelectedValue1] = useState("searches");

  return (
    
      <div className='w-full h-screen md:col-span-2 relative  m-auto p-4 border rounded-lg bg-white dark:bg-darculaBG-heavy flex-col justify-center'>       
        <div className="flex-row mb-5">
          <div className="container">
          <SegmentedControl 
            name="controller"
            callback={(val) => setSelectedValue1(val)}
            defaultIndex={0}
            controlRef={useRef()}
            segments={[
                {
                    label: 'Search Usage',
                    value: 'searches',
                    ref: useRef(),
                },
                {
                    label: 'Top Sources',
                    value:'topSources',
                    ref: useRef(),
                }
            ]}
            /> 
          </div>
        </div>
       

       {isLoading ? (<Loading type="points-opacity" size="xl">
        <p className="font-semibold text-3xl dark:text-slate-200">Graphing Data (in a cool way)...</p>
        </Loading>) : (
          <div>
            {
              (selectedValue1 === 'searches') && <SearchUsage rawData={rawData}/>
            }
            {
              (selectedValue1 === 'topSources') && <SourcesBar data={data}/>
            }

          </div>
        
        
        
        
        )} 
     </div>
    
  )
}

export default ZipGraphs
