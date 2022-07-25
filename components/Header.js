import React, {useEffect, useState} from 'react'
import Modal from './Modal';

export default function Header() {
  const [openModal, setOpenModal] = useState(false); 

  return ( // createPortal allows us to render an element 
    <>
    {openModal && <Modal setOpenModal={setOpenModal} />} {/* If openmodal is true, then render modal with the prop of state */}
      <div className='sticky top-0 w-full left-0 bg-inherit flex items-center justify-between p-4 border-b border-solid border-white'>
        <h1 className='text-3xl select-none sm:text-6xl'>TODO List</h1> {/* the sm: means when the screen goes larger (size sm) make the text larger */}
        <i onClick={() => setOpenModal(true)} className="fa-solid fa-user text-cl sm:text-3xl duration-300 hover:opacity-40 cursor-pointer"></i>
      </div>
    </>
  )
}
