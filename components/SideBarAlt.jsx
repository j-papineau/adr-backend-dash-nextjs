import Link from "next/link";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { spencerView } from "@/data/sideBarItems";
import Image from "next/image";
import { Divider } from "antd";
import { UserAuth } from "@/context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import Login from "@/pages/login";


const SideBarAlt = ({ children }) => {

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
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
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
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 0}00ms`,
                }}
                className={`whitespace-pre duration-300 ${
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

          {!user ? (<div></div>) : (
              <div onClick={handleSignOut} className="group items-center font-medium p-2 flex mt-10 cursor-pointer hover:bg-gray-800 rounded-md">
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
