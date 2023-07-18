import SideBarAlt from '@/components/SideBarAlt'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {

  return (
    <SideBarAlt>
      <Component {...pageProps} />
    </SideBarAlt> 
 )
}
