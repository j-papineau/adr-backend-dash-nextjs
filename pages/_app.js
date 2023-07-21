import SideBarAlt from '@/components/SideBarAlt'
import Sidebar from '@/components/Sidebar'
import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import { UserAuth } from '@/context/AuthContext'
import Login from './login'
import {useState, useEffect} from 'react'
//import react from 'react'
import { Button } from 'antd'


export default function App({ Component, pageProps }) {

  //const [theme, setTheme] = useState("light");

  const [darkTheme, setDarkTheme] = useState(false)


  // useEffect(() => {
  //   if(theme === "dark"){
  //     document.documentElement.classList.add("dark")
  //   }else{
  //     document.documentElement.classList.remove("dark")
  //   }
  // },[theme])
  
  function handleThemeSwitch(){
    // setTheme(theme === "dark" ? "light" : "dark");
    
    setDarkTheme(darkTheme ? false : true)

    
   
      console.log(darkTheme);

    if(darkTheme)
      document.documentElement.classList.add("dark")
    else
      document.documentElement.classList.remove("dark")
    
  };

  return (
   <AuthContextProvider>
    
      <SideBarAlt  darkThemeChange={handleThemeSwitch}>
        <Component {...pageProps} />
        {/* <p className='bg-blue-100 dark:bg-purple-900'>Tester</p> */}
      </SideBarAlt>
    
       
   </AuthContextProvider>

 )
}
