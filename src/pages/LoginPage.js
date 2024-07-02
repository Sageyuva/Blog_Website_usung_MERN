import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { Backdrop, CircularProgress } from '@mui/material'

const LoginPage = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  const LoginUser = async(e) => {
    e.preventDefault();
    try {
      setloading(true)
      const loginuser = await axios.post("https://mernstackblogapp-backend.onrender.com/user/login" , {email,password})
      if(loginuser.status === 200) {
         console.log(loginuser.data.user.name)
         const loggingemail = loginuser.data.user._id
         const logginname = loginuser.data.user.name
         const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3 days expiration
         localStorage.setItem('user', logginname);
         localStorage.setItem('userid', loggingemail);
         localStorage.setItem('expirationTime', expirationTime); // Store expiration time
         setloading(false)
         navigate("/") 
      } else {
        alert("Server is offline")
        setloading(false)
      }
     
    } catch (error) {
      setloading(false)
      if(error.code === "ERR_NETWORK") {
        alert("Server is offline")
        window.location.reload()
      } else if(error.response.status === 402) {
        alert("Invalid password try again")
      } else if(error.response.status === 400) {
        alert("User not found")
      } else {
        alert("Server error try again later")
      }
    }
  }

  useEffect(() => {
    const loggedinUser = localStorage.getItem('user');
    const expirationTime = localStorage.getItem('expirationTime');
    if(loggedinUser && expirationTime && new Date().getTime() < expirationTime) {
      navigate("/")
    } else {
      localStorage.removeItem('user'); // Clear localStorage if session expired
      localStorage.removeItem('userid');
      localStorage.removeItem('expirationTime');
    }
  }, [])

  return (
    <div className='w-[100%] h-[100vh] flex items-center justify-center rounded-md'>
     <form onSubmit={LoginUser} className=' rounded-md border-2 border-white w-[90%] px-4 py-2 flex flex-col items-center justify-center gap-3'>
     <h6 className='text-2xl  font-bold'>Login User</h6>
      <input value={email} onChange={(e) => setemail(e.target.value.toLowerCase())} className='w-[90%] px-4 py-2 outline-none rounded-md' type="text" placeholder='Enter E-Mail' />
      <input value={password} onChange={(e) => setpassword(e.target.value)} className='w-[90%] px-4 py-2 outline-none rounded-md' type="password" placeholder='Enter Password' />
      <button  type="submit" className='w-[90%] rounded-md px-4 py-2 bg-blue-600 text-white border-none font-semibold'>Login</button>
      <p className='font-semibold'>Don't have a account ? <Link to={"/register"}> <span className='text-blue-600'>Register</span></Link> </p>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
     </form>
    </div>
  )
}

export default LoginPage
