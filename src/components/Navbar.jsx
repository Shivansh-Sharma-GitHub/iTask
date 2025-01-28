import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-900 text-white py-3'>
      <div className="logo flex items-center">
        <img src='/icons/android-chrome-192x192.png'
        alt='iTask Logo'
        className="h-8 w-8 ml-2"
        />
        <span className="font-bold text-xl mx-8">iTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all duration-300'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-300'>Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
