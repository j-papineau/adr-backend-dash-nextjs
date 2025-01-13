import Header from "../components/Header"
import MainPage from "../components/PolygonTools/MainPage"


export default function PolygonTools() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen text-black'>
        <Header  title="Polygon Tools"/>
        <MainPage/>
      </main>
      </>
    )
  }