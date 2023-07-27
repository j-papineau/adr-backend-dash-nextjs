'use client'

import Header from "@/components/Header"
import dynamic from "next/dynamic"
import ADRMap from "@/components/AdrMap"
import Map from "@/components/Map"
import SearchBar from "@/components/SearchBar"






export default function adrmap() {
    return (
      
      <main className="bg-slate-300 h-screen w-full dark:bg-darculaBG-heavy">
        <Header title="ADR Map"/>
        <SearchBar
        onAddressSelect={(adress) => {
            console.log(adress);
        }}/>
        <Map/>
      </main>
        
      
      
    )
  }