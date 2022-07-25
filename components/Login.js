import { sign } from 'crypto'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(true)

  const { login, signup, currentUser } = useAuth(); 
  console.log(currentUser); 

  async function submitHandler(){
    if(!email || !password){ // if one state has no data 
      setError('Please enter email and password') // error
      return 
    }
    if(isLoggingIn){
      try{
        await login(email, password)
      }catch(err){
        setError('Incorrect email or password')
      }
      return 
    }
    await signup(email, password)
  }

  return (
    <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
      <h1 className='font-extrabold text-2xl sm:text-4xl select-none uppercase'>{isLoggingIn ? 'Login' : 'Register'}</h1>
      {error && <div className='w-full max-w-[40ch] text-center border border-solid border-rose-400 text-rose-400 py-2'>{error}</div>} {/* if error is true, than render this component */}
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email Adress' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300'/> 
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300'/>     
      <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
        <h2 className='relative z-20'>SUBMIT</h2>
      </button>
      <h2 className='duration-300 hover:scale-110 cursor-pointer'onClick={() => setIsLoggingIn(!isLoggingIn)}>{!isLoggingIn ? 'Login' : 'Register' }</h2> {/* If isLoggingIN is false, render the login text, else render the register text */}
    </div>
  )
}

export default Login
