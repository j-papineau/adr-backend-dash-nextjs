import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import DashCards from '../components/DashCards'
import ZipBarChart from '../components/ZipBarChart'
import RecentZipSearches from '../components/RecentZipSearches'
import  Head  from 'next/head'
import ZipSearchData from '../components/ZipSearchData'
import { Divider } from 'antd'
import { MdTitle } from 'react-icons/md'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>ADR Backend</title>
      <meta name='description' content='description'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <link rel='icon' href='/favico.ico'/>
    </Head>
    <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
      <Header  title="ADR Backend Home Page" />
      <div className='text-black dark:text-white flex flex-col justify-center items-center p-5'>
        <h1 className='text-3xl my-2'>Welcome To The ADR Website Backend App!</h1>
        <p>This project has been solely undertaken by the barketing squad</p>
      </div>
    </main>
    </>
  )
}
