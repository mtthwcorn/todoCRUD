import React, {useContext, useState, useEffect, useRef} from 'react'
import {auth, db} from '../firebase' // auth here is the access to our firebase auth api 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'

// Basic Logic of Context
// 1. import createContext and init it 
// 2. wrap initial component's child components in the create Context var with params as the state 
// 3. use useContext with the param as the createContext var to access all state 

// this page acts as a global state for authorizing a user
const AuthContext = React.createContext()

// So this function allows us to get the current users information along with the functions to control that user 
export function useAuth(){
  return useContext(AuthContext); 
} // useContext allows us to send state content to other components 
// basically useContext is a way to manage state globally

export function AuthProvider({children}){
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const userInfo = useRef() // will store all of the users todo's (so this is like a global state)
  // useRef() can be used to store user data, and when updated it does not cause a rerender 

  function signup(email, password){
    createUserWithEmailAndPassword(auth, email, password) // these auth here is a connection to our database/auth directly 
    return
  }

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }

  useEffect(() => { // use effect runs after each re-render (or update of a state var)
    const unsubscribe = onAuthStateChanged(auth, async user => { // the onAuthStateChange is like a listener that listens if authentication changes
      // the user param of the arrow function is the ID of the currently logged in user 
      setCurrentUser(user) // if it does, set the current user 
      setLoading(false) // set loading to false 
    })
    return unsubscribe
  }, [])

  const value = { 
    currentUser, 
    login,
    signup,
    logout, 
    userInfo 
  }

  return (
    <AuthContext.Provider value={value}> 
      {!loading && children} 
    </AuthContext.Provider>
  )

}