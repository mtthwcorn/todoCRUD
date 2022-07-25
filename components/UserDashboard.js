import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TodoCard from './TodoCard'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '../hooks/fetchTodos'
import { type } from 'os'

export default function UserDashboard() {
    const { userInfo, currentUser } = useAuth()
    const [edit, setEdit] = useState(null)
    const [todo, setTodo] = useState('')
    const [edittedValue, setEdittedValue] = useState('')

    const { todos, setTodos, loading, error } = useFetchTodos()

  console.log(typeof todos) // NOTE: todos is an object with key/value pairs 

  // useEffect(() => {
  //   // If userInfo is null or userInfo keys (data) length is 0
  //   if (!userInfo || Object.keys(userInfo).length == 0) {
  //     setEdit(true); // automatically set the page to AddToDo
  //   }
  // }, [userInfo]);

  async function handleAddToDo() {
    if (!todo) {
      return;
    }
    // @ts-ignore -- Object.keys returns an array of the object keys - in this case will be index of the each todo in the current toDoList
    const newKey =
      Object.keys(todos).length === 0
        ? 1
        : Math.max(...Object.keys(todos)) + 1 || 1;
    setTodos({ ...todos, [newKey]: todo }) 
    const userRef = doc(db, 'users', currentUser.uid) // each user has a specific UID which identifies them 
    await setDoc(userRef, { // add user data to db using our userRef
      'todos': {
        [newKey]: todo,
      }
    }, {merge: true}) // merge: true adds new key + todo to existing doc instead of overwriting the existing doc
    setTodo('')
  }

  async function handleEditTodo(){
    if (!edittedValue) {
      return;
    }
    // @ts-ignore -- Object.keys returns an array of the object keys - in this case will be index of the each todo in the current toDoList
    const newKey = edit
    setTodos({
      ...todos,
      // set the todo list to all previous todo's + newKey number : todo
      [newKey]: edittedValue,
    });
    const userRef = doc(db, 'users', currentUser.uid) // each user has a specific UID which identifies them 
    await setDoc(userRef, { // add user data to db using our userRef
      'todos': {
        [newKey]: edittedValue,
      }
    }, {merge: true})
    setEdit(null)
    setEdittedValue('')
  }

  function handleAddEdit(todoKey){ // sets the todocard key that we want to edit to the edit state value so we can work with it on a global scale in this component
      return () => {
        setEdit(todoKey)
        setEdittedValue(todos[todoKey])
      }
  }

  function handleDelete(todoKey){
    return async () => {
      const tempObj = {...todos} 
      delete tempObj[todoKey]
      setTodos(tempObj)
      const userRef = doc(db, 'users', currentUser.uid) // each user has a specific UID which identifies them 
      await setDoc(userRef, { // add user data to db using our userRef
      'todos': {
        [todoKey]: deleteField(),
      }
    }, {merge: true})
    }
  }

  return (
    <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">
      <div className="flex items-stretch">
        {" "}
        {/* NOTE- REMOVED - If addToDo is true, then render this input and button as we have clicked on the ADD TODO button below and want to add a new todo */}
        <input
          type="text"
          placeholder="Enter todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1"
        />
        <button
          onClick={handleAddToDo}
          className="w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40"
        >
          {" "}
          ADD{" "}
        </button>
      </div>
      {(userInfo && loading) && (<div className='flex-1 grid place-items-center'>
        <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
      </div>)}
      {(userInfo && !loading) && ( // if user info exists from our user, then we render this content
        <>
          {" "}
          {/* .keys returns an array of the keys for the todos (which is a state var stored in fetchTodos): so the number of each toDo */}
          {Object.keys(todos).map((todo, i) => { 
            // todo is current key value (which starts at 1), i is index # of array (which starts at 0) 
            return ( // basically we want to render each todo from todos (var from fetchtodos) (along with any newly added todos) without needing to refresh the page 
              <TodoCard key={i} handleEditTodo = {handleEditTodo} handleDelete = {handleDelete} handleAddEdit={handleAddEdit} edit={edit} todoKey={todo} edittedValue={edittedValue} setEdittedValue={setEdittedValue}>
                {" "} 
                {/* Key (todo) will be one above the index (i) */}
                {todos[todo]} {/* This is each todo -> the actual data is in object form but we are using property accessors to access each object value using its key */}
                {/* We are using */} 
                {/* THis will output the current todo in the state variable todos */}
              </TodoCard>
            );
          })}
        </>
      )}
      {/* {!addToDo && <button onClick= {() => setAddToDo(true)} className='text-cyan-300 border border-solid border-cyan-300 py-2 text-center duration-300 hover:opacity-30'> ADD TODO </button>}  */}
    </div>
  );
}
