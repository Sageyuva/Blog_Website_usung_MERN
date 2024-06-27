import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {Backdrop , CircularProgress} from '@mui/material'
const RegsiterPage = () => {

const navigate = useNavigate()

const [loading, setloading] = useState(false)
const [name, setname] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")

const handleRegister = async(e) => {
  e.preventDefault();
  setloading(true)
  try {

    if (name === "" || email === "" || password === "") {
      setloading(false)
  alert("All fields are not filled. Please try again.");
  window.location.reload();
}else{
  const newuser = await axios.post("https://mernstackblogapp-backend.onrender.com/user/register" ,{ name , email ,password})
  setloading(false) 
  alert("Created new account")
   navigate("/login")
}

  } catch (error) {
    setloading(true)
    if(error.response || error.response.status === 400){
      setloading(false)
      alert("Email is already taken")
    }else{
      setloading(false)
      alert("Server Busy")
    }
    console.log(error)
  }

}



  useEffect(() => {

    const loggedinUser = localStorage.getItem('user');
    
    if(loggedinUser){
     navigate("/")
    }
  }, [])

  return (

    <div className='w-[100%] h-[100vh] flex items-center justify-center rounded-md'>
    <form onSubmit={handleRegister} className=' rounded-md border-2 border-white w-[90%] px-4 py-2 flex flex-col items-center justify-center gap-3'>
    <h6 className='text-2xl  font-bold'>Register new User</h6>
    <input className='w-[90%] px-4 py-2 outline-none rounded-md' type="text"
     value={name} onChange={(e)=> setname(e.target.value)}
      placeholder='Enter Name' />
     <input className='w-[90%] px-4 py-2 outline-none rounded-md'
     value={email} onChange={(e)=> setemail(e.target.value.toLowerCase())}
      type="text" placeholder='Enter E-Mail' />
     <input className='w-[90%] px-4 py-2 outline-none rounded-md' type="password"
     value={password} onChange={(e)=> setpassword(e.target.value)}
      placeholder='Enter Password' />
     <button type='submit' className='w-[90%] rounded-md px-4 py-2 bg-green-600 text-white border-none font-semibold'>Register</button>
     <p className='font-semibold'>Already have a account ? <Link to={"/login"}> <span className='text-blue-600'>Login</span></Link> </p>
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

export default RegsiterPage