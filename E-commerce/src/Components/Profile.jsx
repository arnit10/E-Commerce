import React , {useEffect} from 'react'
import { useLocation , useNavigate , useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../features/auth/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state;
    const { name } = useParams();
  
    useEffect(() => {
      // If no user data, redirect to login page
      if (!user) {
        navigate("/");
      }
    }, [user, navigate]);
  
    if (!user) {
      return null; // or a loading indicator while redirecting
    }
  
    const handleLogout = async()=>{
      try{
        localStorage.removeItem("token"); // Clear token from localStorage
        dispatch(logoutAction());         // Clear Redux auth state
        navigate('/');                    // Redirect to homepage
        alert('Logged out successfully');
      }catch(err){
        console.error(err)
      }
      
    }
    return (
      <div className='flex items-center justify-center'>
        <div className=' m-10 p-10 flex flex-col border rounded-3xl  gap-8 ' >
        <h1 className='text-4xl mb-30 '> Welcome, {user.name}!</h1>
        <p ><b>User name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <button
            className='mt-10 px-5 py-5 bg-red-600 text-white border-0 rounded-2xl cursor-pointer max-w-90'
          
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      </div>
    )
}

export default Profile