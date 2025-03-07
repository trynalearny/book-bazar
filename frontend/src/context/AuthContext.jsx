import {  createContext, useContext , useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword,  onAuthStateChanged,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth";

const AuthContext =  createContext();
const googleProvider = new GoogleAuthProvider();



// authProvider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register a user
    const registerUser = async (email,password) => {

        return await createUserWithEmailAndPassword(auth, email, password);
    }
    //login  user
    const loginUser = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    

};

    
    const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
// sign in with gmail google
const signInWithGoogle = async () => {
     
    return await signInWithPopup(auth, googleProvider)
}
//logout user
const logout=()=>
{
    return signOut(auth)
}
  // manage user
  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);

        if(user) {
           
            const {email, displayName, photoURL} = user;
            const userData = {
                email, username: displayName, photo: photoURL
            } 
        }
    }) 
     return () => unsubscribe();
}, [])

  
    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        loading
        
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}