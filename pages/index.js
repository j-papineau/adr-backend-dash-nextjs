import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import DashCards from '@/components/DashCards'
import ZipBarChart from '@/components/ZipBarChart'
import RecentZipSearches from '@/components/RecentZipSearches'
import  Head  from 'next/head'
import ZipSearchData from '@/components/ZipSearchData'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>ADR Backend</title>
      <meta name='description' content='description'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <link rel='icon' href='/favico.ico'/>
    </Head>
    <main className='bg-gray-100 min-h-screen'>
      <Header/>
        <DashCards/>
          <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
            <ZipSearchData/>
            <RecentZipSearches/>
          </div>
    </main>
    </>
  )
}
