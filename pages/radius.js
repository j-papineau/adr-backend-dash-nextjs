import Header from "../components/Header"
import Error from "../components/Error"
import HaulerZipRadiusMap from "../components/HaulerZipRadiusMap"
import { Tab, Fragment} from "@headlessui/react"
import HaulerMap from "../components/HaulerMap"



export default function Radius() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium h-[200vh] p-4'>
        <Header  title="Radius Tool"/>

        <div className='text-black dark:text-white'>
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    <Tab as={Fragment} className="w-full rounded-lg py-2.5 text-sm font-medium leading-5">
                            {({ selected }) => (
                                /* Use the `selected` state to conditionally style the selected tab. */
                                <button
                                className={
                                    selected ? 'text-white underline' : 'text-blue-700'
                                }
                                >
                                Radius Tool
                                </button>
                            )}
                    </Tab>
                    <Tab as={Fragment} className="w-full rounded-lg py-2.5 text-sm font-medium leading-5">
                        {({ selected }) => (
                            /* Use the `selected` state to conditionally style the selected tab. */
                            <button
                            className={
                                selected ? 'text-white underline' : 'text-blue-700'
                            }
                            >
                            View Hauler Map
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <>
                            <p className='text-center py-4'>Note: many zips are served out of the same area, and will only be displayed as a single marker</p>
                            <HaulerZipRadiusMap/>
                        </>
                    </Tab.Panel>
                    <Tab.Panel>
                        <>
                        <HaulerMap/>
                        </>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
                
        </div>
        
          
      </main>
      </>
    )
  }