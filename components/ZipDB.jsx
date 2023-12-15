import React from 'react'
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import CheckZips from "../components/CheckZips"
import ZipSearchDB from '../components/ZipSearchDB';
import ZipSearchTest from './ZipSearchTest';

const ZipDB = () => {
  return (
    <div className='text-black dark:text-white h-screen m-2'>
        <Tabs defaultValue={1}>
        <TabsList className="mb-4 rounded-xl bg-blue-500 flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg">
          <Tab
            slotProps={{
              root: ({ selected, disabled }) => ({
                className: `font-sans ${
                  selected
                    ? 'text-blue-500 bg-white'
                    : 'text-white bg-transparent focus:text-white hover:bg-blue-400'
                } ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              }),
            }}
            value={1}
          >
            Regions
          </Tab>
          <Tab
            slotProps={{
              root: ({ selected, disabled }) => ({
                className: `font-sans ${
                  selected
                    ? 'text-blue-500 bg-white'
                    : 'text-white bg-transparent focus:text-white hover:bg-blue-400'
                } ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              }),
            }}
            value={2}
          >
            DB
          </Tab>
          <Tab
            slotProps={{
              root: ({ selected, disabled }) => ({
                className: `font-sans ${
                  selected
                    ? 'text-blue-500 bg-white'
                    : 'text-white bg-transparent focus:text-white hover:bg-blue-400'
                } ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              }),
            }}
            value={3}
          >
            Help
          </Tab>
        </TabsList>
        <TabPanel className="w-full font-sans" value={1}>
          <CheckZips/>
        </TabPanel>
        <TabPanel className="w-full font-sans" value={2}>
          <ZipSearchDB/>
        </TabPanel>
        <TabPanel className="w-full font-sans" value={3}>
          <ZipSearchTest/>
        </TabPanel>
      </Tabs>


    </div>
  )
}

export default ZipDB