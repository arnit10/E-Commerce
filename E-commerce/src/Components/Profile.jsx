import React , {useEffect} from 'react'
import { useLocation , useNavigate , useParams} from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state;
    const { username } = useParams();
  
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
        await axios.get('http://127.0.0.1:8000/auth/logout/', { withCredentials: true })
        navigate('/')
        alert('logged out successfully')
      }catch(err){
        console.error(err)
      }
      
    }
    return (
      <div className='flex items-center justify-center'>
        <div className=' m-10 p-10 flex flex-col border rounded-3xl  gap-8 ' >
        <h1 className='text-4xl mb-30 '> Welcome, {user.first_name}!</h1>
        <p ><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Full Name:</b> {user.first_name} {user.last_name}</p>
      
        <button
            className='mt-10 px-5 py-5 bg-red-600 text-white border-0 rounded-2xl cursor-pointer max-w-90'
          
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      </div>
  
      // <h1>Welcome, {username}!</h1>
    )
}

export default Profile