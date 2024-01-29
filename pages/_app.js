import SideBarAlt from '../components/SideBarAlt'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/globals.css'

import { UserAuth } from '../context/AuthContext'
import Login from './login'
import {useState, useEffect} from 'react'
//import react from 'react'
import { AnimatePresence, motion } from 'framer-motion'


export default function App({ Component, pageProps }) {

  //const [theme, setTheme] = useState("light");

  const [darkTheme, setDarkTheme] = useState(true)


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
        <AnimatePresence
          initial={{ x:1000 }}
          animate={{ x:0 }}
          transition={{ duration: 1}}
          exit= {{x:1000}}
        >
          <motion.div>
            <Component {...pageProps} />
          </motion.div>
          
        </AnimatePresence>
        
        {/* <p className='bg-blue-100 dark:bg-purple-900'>Tester</p> */}
      </SideBarAlt>
    
       
   </AuthContextProvider>

 )
}
