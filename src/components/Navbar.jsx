import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-around place-items-center gap-4 h-16 bg-gray-900 text-white text-center' >

     <div className='w-52 text-3xl '>
     <h1 className='font-extrabold text-4xl ' >NOTES</h1>
     </div>

      <div className='w-[100%] flex justify-around'>
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