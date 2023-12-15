import Header from "../components/Header"
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import RegionScoreData from "../components/RegionScoreComponents/RegionScoreData";


export default function RegionScore() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium h-[110vh] overflow-hidden'>
        <Header  title="Region Scores"/>
        <Tabs defaultValue={1}>
        <TabsList className="mb-4 rounded-xl bg-purple-500 flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg">
          <Tab
            slotProps={{
              root: ({ selected, disabled }) => ({
                className: `font-sans ${
                  selected
                    ? 'text-purple-500 bg-white'
                    : 'text-white bg-transparent focus:text-white hover:bg-purple-400'
                } ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              }),
            }}
            value={1}
          >
            Scores Report
          </Tab>
          <Tab
            slotProps={{
              root: ({ selected, disabled }) => ({
                className: `font-sans ${
                  selected
                    ? 'text-purple-500 bg-white'
                    : 'text-white bg-transparent focus:text-white hover:bg-purple-400'
                } ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              }),
            }}
            value={2}
          >
            Data
          </Tab>
        </TabsList>
        <TabPanel className="w-full font-sans" value={1}>
          Region Scores
        </TabPanel>
        <TabPanel className="w-full font-sans" value={2}>
          <RegionScoreData/>
        </TabPanel>
      </Tabs>
        
        
          
      </main>
      </>
    )
  }