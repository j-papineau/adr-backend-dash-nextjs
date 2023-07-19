import SideBarAlt from '@/components/SideBarAlt'
import Sidebar from '@/components/Sidebar'
import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import { UserAuth } from '@/context/AuthContext'
import Login from './login'


export default function App({ Component, pageProps }) {

  

  return (
   <AuthContextProvider>
    
      <SideBarAlt>
        <Component {...pageProps} />
      </SideBarAlt>
    
       
   </AuthContextProvider>

 )
}
