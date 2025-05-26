import React, { useState , useRef, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { login , logout } from '../features/auth/authSlice';

const Navbar = () => {
    const dispatch = useDispatch()
    const {user , isLoggedIn} = useSelector((state) => state.auth)
    const [isOpen , setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const btnRef = useRef(null)

    const handleLogin = () => {
        const dummyUser = {
        name: 'John Doe',
        email: 'john@example.com',
        };
        const dummyToken = 'fake-jwt-token';

        dispatch(login({ user: dummyUser, token: dummyToken }));
    };

    const handleLogout = () => {
        localStorage.removeItem("token")
        dispatch(logout());
    };

    

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
            <Link  to={"/"} >NextCart</Link>
            {/* Desktop Menu */}
            <div className='hidden md:flex space-x-6'>
                <NavLink className={'hover:text-blue-500'} to={'/'} >Home</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/categories'}>Categories</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/contact'}>Contact</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/about'}>About</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/cart'}>Cart</NavLink>
                
            </div>
            <div className='hidden md:flex space-x-8 w-60 justify-around'>
                {isLoggedIn ? (<>
                <p>{user?.name}</p>
                <button onClick={()=> dispatch(logout())}>Logout</button>
                </>):(<>
                    <NavLink className={'hover:text-blue-500'} to={'/login'}>Login</NavLink>
                   
                    {/* <button onClick={handleLogin}>Login</button> */}
                    <NavLink className={'hover:text-blue-500'} to={'/signup'}>Signup</NavLink>
                </>)}
            </div>
            {/* <div className='hidden md:flex space-x-8'>
                <NavLink className={'hover:text-blue-500'}>Cart</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/login'}>Login</NavLink>
                <NavLink className={'hover:text-blue-500'} to={'/signup'}>Signup</NavLink>
            </div> */}

            {/* Mobile Menu Toggle */}
            <div className=' md:hidden '>
                <button className='text-white' onClick={ToggleMenu}>
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'flex flex-col':'hidden'} bg-gray-700 py-4 items-center text-2xl`} ref={menuRef}>
            <NavLink className={'hover:text-blue-500'} to={'#'} >Home</NavLink>
            <NavLink className={'hover:text-blue-500'} to={'#'}>Categories</NavLink>
            <NavLink className={'hover:text-blue-500'} to={'/contact'}>Contact</NavLink>
            <NavLink className={'hover:text-blue-500'} to={'/about'}>About</NavLink>
            <NavLink className={'hover:text-blue-500'}>Cart</NavLink>
            {isLoggedIn ? (<>
                <p>{user?.name}</p>
                <button onClick={handleLogout}>Logout</button>
            </>):(<>
                {/* <NavLink className={'hover:text-blue-500'} to={'/login'}>Login</NavLink>
                 */}
                 <button onClick={handleLogin}>Login with Dummy Data</button>
            </>)}
            
        </div>
    </nav>
  )
}

export default Navbar