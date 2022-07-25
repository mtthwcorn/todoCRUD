import React, {useState, useEffect, useRef } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

export default function useFetchTodos() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [todos, setTodos] = useState(null)
  
  const {currentUser} = useAuth() 

  useEffect(() => {
    console.log("bananan")
    async function fetchData(){
      try{
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setTodos(docSnap.data().todos)
        } else {
          setTodos({})
        }
      } catch (err) {
        setError('Failed to load todos')
      } finally {
        setLoading(false)
      }
    }
    fetchData() 
  }, []) 
  

  // note the second param, an array here, is a dependency array. When something in this second param changes, the useEffect will run. 
  // since this array is blank, this useEffect will run on page load 

  return { loading, error, todos, setTodos }
    // loading staate runs while fetching the todos
    // error runs if there is an error fetching
    // todos is the value of all todos for the user 
    // setTodos sets the todos to todos state var 
  
}
