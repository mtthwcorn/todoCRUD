import React from 'react'
import Header from './Header'
import Footer from './Footer'

// initialize the page layout here -> this is imported into the 
export default function Layout(props) {
  const { children } = props
  return (
    <div className='flex flex-col min-h-screen relative bg-slate-900 text-white'>
    <Header/>
    <main className='flex-1 flex flex-col p-4'> {/* flex-1 takes up full row */}
      {children}
    </main>
    <Footer/> 
    </div>
  )
}
