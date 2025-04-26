import React, { useState , useRef, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    const [isOpen , setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const btnRef = useRef(null)

    const ToggleMenu = () =>{
        setIsOpen(!isOpen)
    }

    useEffect(()=>{
        const handleClickOutside = (e) =>{
            if(menuRef.current && !menuRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown" , handleClickOutside )
        return()=>{
            document.removeEventListener("mousedown" ,handleClickOutside)
        }
    },[])

  return (
    <nav className='bg-gray-800 text-white shadow-md'>
        <div className='flex p-6 text-xl justify-between'>
            <Link  to={"/"} >My Shop</Link>
            {/* Desktop Menu */}
            <div className='hidden md:flex space-x-6  '>
                <NavLink className={'hover:text-blue-500'} to={'/'} >Home</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/home'}>Categories</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/home'}>Contact</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/about'}>About</NavLink>
                
            </div>
            <div className='hidden md:flex space-x-8'>
                <NavLink className={'hover:text-blue-500'}>Cart</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/login'}>Login</NavLink>
            </div>

            {/* Mobile Menu Toggle */}
            <div className=' md:hidden '>
                <button className='text-white' onClick={ToggleMenu}>
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'flex flex-col':'hidden'} bg-gray-700 py-4 items-center text-2xl`} ref={menuRef}>
            <NavLink className={'hover:text-blue-500'} to={'/home'} >Home</NavLink>
            <NavLink className={'hover:text-blue-500'} to={'/home'}>Categories</NavLink>
            <NavLink className={'hover:text-blue-500'} to={'/home'}>Contact</NavLink>
            <NavLink className={'hover:text-blue-500'} to={'/home'}>About</NavLink>
            <NavLink className={'hover:text-blue-500'}>Cart</NavLink>
            <NavLink className={'hover:text-blue-500'} to={'/login'}>Login</NavLink>
        </div>
    </nav>
  )
}

export default Navbar