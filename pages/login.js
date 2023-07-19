import react from "react";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import {FcGoogle} from "react-icons/fc"
import Image from "next/image";


const Login = () => {

    const {user, googleSignIn, logOut} = UserAuth();

    const handleSignIn = async () => {
        try{
            await googleSignIn();
        } catch(error){
            console.log(error);
        }
    }

    return(

    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-300">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
            <div className="ml-[25%] mr-[25%] bg-gray-400 rounded-lg mb-4">
                    <Image src="/images/adrlogo.png"
                        width={300}
                        height={300}
                        alt="ADR-logo"/>
            </div>
           
        <h1 className="text-3xl font-bold text-center text-gray-700">ADR Site Backend</h1>

        
        <form className="mt-6">
          <div className="mt-2">
            
            <div onClick={handleSignIn} className="w-full flex items-center justify-center px-10 py-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    <FcGoogle/>
                    <p className="pl-3">Login with ADR account</p>
            </div>
          </div>
        </form>
      </div>
    </div>

    )
}

export default Login