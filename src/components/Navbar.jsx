

import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-end place-items-center gap-4 h-16 bg-gray-900 text-white text-center' >

     <div className='w-[70%] text-3xl '>
     <h1 className='font-extrabold text-4xl text-left ' >NOTES</h1>
     </div>

      <div className='w-[20%] flex justify-around  border-blue-100'>
      <NavLink to='/' >
            HOME
        </NavLink>
        <NavLink to='/pastes' >
            NOTES
        </NavLink>
        

      </div>
    </div>
  )
}

export default Navbar