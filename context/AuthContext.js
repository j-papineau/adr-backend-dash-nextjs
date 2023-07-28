import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "@firebase/auth";
import {auth, db} from '../firebase'
import { DocumentSnapshot, Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";



const AuthContext = createContext()



export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    //add default config
    const [userData, setUserData] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    async function checkUserDocument(user){
        // check to see if firebase doc exists

        const id = user.uid;
        console.log("from check:")
        console.log(user);
        
        const docRef = doc(db, "Users", id)
        const docSnapshot = await getDoc(docRef);

        if(docSnapshot.exists()){
            console.log(docSnapshot.data())
            setUserData(docSnapshot.data())
        } else {

            const userData = {
                name: user.displayName,
                email: user.email,
                darkMode: false,
                privileges: "none",
                team: "Dumpstars"
            }
            await setDoc(doc(db, "Users", id), {
                //defaults
                userData
            })

            setUserData(userData)
        }


        

       
    }

    useEffect(() => {

        //check if firebase doc exists
        if(user !== null)
            checkUserDocument(user)


        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()

        

        
        

    }, [user]);

    useEffect(() => {
        //on load func
        


    }, [])



    return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, userData }}>
        {children}
        </AuthContext.Provider>
    )
 }

export const UserAuth = () => {
    return useContext(AuthContext)
}





