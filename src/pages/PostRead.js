import React, { useEffect, useState } from 'react'
import {Backdrop , CircularProgress} from '@mui/material'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../styles/potread.css"
import { CircleUser } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Pen } from 'lucide-react';

const PostRead = () => {


  const {id} = useParams()
  const navigate = useNavigate()
  const [owner, setowner] = useState(false)
  const [loading, setloading] = useState(true)
  const [heading, setheading] = useState("")
  const [caption, setcaption] = useState("")
  const [tag, settag] = useState("")
  const [username, setusername] = useState("")

   const fetchData = async() => {
    try {
      
    const blogData = await axios.get(`https://mernstackblogapp-backend.onrender.com/post/onepost/${id}`)
    const logeduser = localStorage.getItem('userid')
    if(logeduser === blogData.data.userid){
      setowner(true)
    }
    setheading(blogData.data.heading)
    setcaption(blogData.data.caption)
    settag(blogData.data.tag)
    setusername(blogData.data.username)
    setloading(false)
    } catch (error) {
      alert("Server failed")
      navigate("/")
    }
  }

  const handlePostDelete = async() => {

    try {
      setloading(true)
      const deletePost = await axios.delete(`https://mernstackblogapp-backend.onrender.com/post/deletepost/${id}`)
      alert("post deleted")
      setloading(false)
      navigate("/")
    } catch (error) {
      alert("server failed")
    }

  }


   useEffect(() => {

   fetchData()
   } ,[])


  return (
    <>

<Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
  <div className='post-container'>
  <div className="post-card">
    
  <p className='Post-User'>  <CircleUser />  {username}</p>
  <p className='Post-Tag'>{tag}</p>
    <p className='Post-Heading'>{heading}</p>
    <img src="https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2022/06/How_To_Start_A_Blog_-_article_image.jpg" className='w-[100%] h-[250px] object-cover rounded-lg' alt="" />
    <p className='Post-Caption'>{caption}</p>
  </div>
  </div>

  {
    owner ?
     (
      <div className='fixed top-[2%] right-[5%] flex gap-2'>
      <Link to={`/editpost/${id}`}><button className='py-1 flex items-center justify-center px-3  bg-blue-500 rounded-xl gap-2 text-white font-semibold'> <Pen/> Edit </button></Link>
      <button onClick={handlePostDelete} className='py-1 flex items-center justify-center px-3  bg-red-500 rounded-xl gap-2 text-white font-semibold'> <Trash2/> Delete </button>
      </div>
     )
      : null
  }

    </>
  )
}

export default PostRead