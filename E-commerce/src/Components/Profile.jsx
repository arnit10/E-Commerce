import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout as logoutAction } from '../features/auth/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { name } = useParams()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  if (!user) {
    return null // Or a loading message while redirecting
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token")
      dispatch(logoutAction())
      navigate('/')
      alert('Logged out successfully')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='m-10 p-10 flex flex-col border rounded-3xl gap-8'>
        <h1 className='text-4xl'>Welcome, {user.name}!</h1>
        <p><b>User name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <button
          className='mt-10 px-5 py-5 bg-red-600 text-white border-0 rounded-2xl cursor-pointer'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile