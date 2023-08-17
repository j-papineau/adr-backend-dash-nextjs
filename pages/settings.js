import Header from "../components/Header"
import Error from "../components/Error"


export default function Settings() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="User Settings"/>

        <Error errorText={"This page is still under construction"}></Error>
        
          
      </main>
      </>
    )
  }