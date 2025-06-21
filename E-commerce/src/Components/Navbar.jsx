import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/auth/authSlice'


const Navbar = () => {
  const dispatch = useDispatch()
  const { user, isLoggedIn } = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const btnRef = useRef(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    navigate("/")
  }

  const ToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className='bg-gray-800 text-white shadow-md'>
      <div className='flex p-6 text-xl justify-between'>
        <Link to={'/'}>NextCart</Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6'>
          <NavLink className='hover:text-blue-500' to='/'>
            Home
          </NavLink>
          <NavLink className='hover:text-blue-500' to='/categories'>
            Categories
          </NavLink>
          <NavLink className='hover:text-blue-500' to='/contact'>
            Contact
          </NavLink>
          <NavLink className='hover:text-blue-500' to='/about'>
            About
          </NavLink>
        </div>

        <div className='hidden md:flex space-x-8 w-60 justify-around'>
          {isLoggedIn ? (
            <>
              <NavLink className='hover:text-blue-500' to='/cart'>
                Cart
              </NavLink>

              {/* USER DROPDOWN */}
              <div className='relative group '>
                <p className='rounded-lg hover:bg-gray-700 cursor-pointer'>
                    {user?.name}
                </p>

                <ul className='absolute right-0 bg-white text-black mt-2 rounded-lg shadow-md w-40 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                    <li>
                    <NavLink to={`/profile/${user?.username || 'user'}`} className='block px-4 py-2 hover:bg-gray-100'>Profile</NavLink>
                    </li>
                    <li>
                    <NavLink to='/address' className='block px-4 py-2 hover:bg-gray-100'>Address</NavLink>
                    </li>
                    <li>
                    <NavLink to='/my-orders' className='block px-4 py-2 hover:bg-gray-100'>Orders</NavLink>
                    </li>
                    <li>
                    <button onClick={handleLogout} className='block px-4 py-2 w-full text-left hover:bg-gray-100'>Logout</button>
                    </li>
                </ul>
            </div>
            </>
            ) : (<>
            <NavLink className='hover:text-blue-500' to='/login'>
                Login
            </NavLink>
            <NavLink className='hover:text-blue-500' to='/signup'>
                Signup
            </NavLink>
            </>
        )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button className='text-white' onClick={ToggleMenu}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? 'flex flex-col' : 'hidden'
        } bg-gray-700 py-4 items-center text-2xl`}
        ref={menuRef}
      >
        <NavLink className='hover:text-blue-500' to='#'>
          Home
        </NavLink>
        <NavLink className='hover:text-blue-500' to='#'>
          Categories
        </NavLink>
        <NavLink className='hover:text-blue-500' to='/contact'>
          Contact
        </NavLink>
        <NavLink className='hover:text-blue-500' to='/about'>
          About
        </NavLink>
        <NavLink className='hover:text-blue-500'>Cart</NavLink>
        {isLoggedIn ? (
          <>
            <p>{user?.name}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className='hover:text-blue-500' to='/login'>
              Login
            </NavLink>
            <NavLink className='hover:text-blue-500' to='/signup'>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar

