'use client'
import React, {useMemo} from "react"
import dynamic from "next/dynamic"
import Header from "../components/Header"
import { CircularProgress } from "@mui/material"
import MapStuff from "../components/mapStuff/MapStuff"

// const MapStuff = useMemo(() => dynamic(
//   () => import('../components/mapStuff/MapStuff'),
//   {
//     loading: () => <CircularProgress/>,
//     ssr: false
//   }
// ), [])



export default function geoJSON() {
    return (
      <>
      
      <main className='bg-slate-100 dark:bg-darculaBG-medium min-h-screen'>
        <Header  title="Map File Editor"/>

        <MapStuff/>  
      </main>
      </>
    )
  }