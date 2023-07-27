'use client'

import Header from "@/components/Header"
import dynamic from "next/dynamic"
import ADRMap from "@/components/AdrMap"
import Map from "@/components/Map"
import SearchBar from "@/components/SearchBar"






export default function adrmap() {

    function addressSelected(address){

    }


    return (
      
      <main className="bg-slate-300 h-screen w-full dark:bg-darculaBG-heavy">
        <Header title="ADR Map"/>
        <Map />
        
      </main>
        
      
      
    )
  }