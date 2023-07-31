import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "@firebase/auth";
import {auth, db} from '../firebase'
import { DocumentSnapshot, Firestore, addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";



const AuthContext = createContext()



export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    //add default config
    const [userData, setUserData] = useState(null)

    const [userPrivilege, setUserPrivilege] = useState("none")

    const [isAdmin, setAdmin] = useState(false)

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
        //console.log("from check:")
        //console.log(user);
        
        const docRef = doc(db, "Users", id)
        const docSnapshot = await getDoc(docRef);

        if(docSnapshot.exists()){
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
                userData
            })

            setUserData(userData)
        }
    }

    async function getUserPerms(user){
        //query FB to get user priv level
        const docRef = doc(db, "Users", user.uid)
        const docSnap = await getDoc(docRef);
        let priv = "basic"
        if(docSnap.exists()){
            //console.log(docSnap.data())
            priv = docSnap.data().userData.privileges

            if(priv === "admin" || priv === "dev"){
                setAdmin(true);
            }
        }

        setUserPrivilege(priv)

    }

    useEffect(() => {

        //check if firebase doc exists
        if(user !== null){
            checkUserDocument(user);
            getUserPerms(user);
        }
            


        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            
        })
        return () => unsubscribe()

    }, [user]);

    useEffect(() => {
        //on load func
        


    }, [])



    return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, userData, userPrivilege, isAdmin}}>
        {children}
        </AuthContext.Provider>
    )
 }

export const UserAuth = () => {
    return useContext(AuthContext)
}





