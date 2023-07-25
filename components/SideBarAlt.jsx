'use client'

import Link from "next/link";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { spencerView } from "@/data/sideBarItems";
import Image from "next/image";
import { Divider } from "antd";
import { UserAuth } from "@/context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import Login from "@/pages/login";
import { useState, useEffect } from "react";
import { Switch, Checkbox } from "@nextui-org/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";





const SideBarAlt = ({ children, darkThemeChange}) => {

  const [selected, setSelected] = React.useState(false)

  useEffect(() => {
    console.log("changing")
    darkThemeChange();
  }, [selected])

  const menus = spencerView
  const {user, logOut, googleSignIn} = UserAuth()

  const handleSignIn = async () => {
    try{
      await googleSignIn()
    }catch(error){
      console.log(error)
    }
  }

  const handleSignOut = async ()  => {
    try{
      console.log("signingOut")
      await logOut();
    } catch (error){
      console.log(error);
    }
  }

  

  const [open, setOpen] = useState(true);
  return (
    <div>
    {!user ? (<Login></Login>) : (

        <div className="flex">
      <div
        className={`bg-lightBG-medium dark:bg-darculaBG-heavy min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-900 dark:text-slate-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div>
        <Link href='/'>
                      <Image src="/images/adrlogo.png"
                      width={150}
                      height={120}
                      alt="ADR-logo"/>
        </Link> 
        
        </div>
        <Divider style={{ borderWidth: 1, borderColor: 'white' }} />
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 hover:text-slate-300 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 0}00ms`,
                }}
                className={`whitespace-pre duration-100 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>

            
          ))}

          <div className="group flex items-center p-2  font-medium mt-10">
            
            <BsMoonFill className="mr-4"/>
            <Switch className="overflow-hidden" onChange={setSelected}  />

          </div>
         
         
          {!user ? (<div></div>) : (
              <div onClick={handleSignOut} className="group items-center font-medium p-2 flex  cursor-pointer hover:bg-gray-800 rounded-md">
              <FiLogOut size={20}></FiLogOut>
              <h2 className="pl-4 overflow-hidden">Log Out</h2>
              </div>
          )}

          
        </div>
      </div>
      <main className="w-full">{children}</main>
    </div>

    )
    }
    </div>
    
  );
};

export default SideBarAlt;
