import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {

  const navigate = useNavigate()
  const [username, setusername] = useState("")
  const [userid, setuserid] = useState("")
  const [heading, setheading] = useState("")
  const [caption, setcaption] = useState("")
  const [tag, settag] = useState("")


  const handleTagChange = (event) => {
    settag(event.target.value);
  };

  const handleNewPost = async() => {

try {

  const newPost = await axios.post("https://mernstackblogapp-backend.onrender.com/post/addpost" ,{username, userid , caption , heading ,tag} )

  console.log(newPost)
  alert("Blog Uploaded")
  navigate("/")
} catch (error) {
  alert("failed to upload blog")
}

  }


  useEffect(() => {
    const loggedinUser = localStorage.getItem('user')
    const loggedinUserId = localStorage.getItem('userid')
    setusername(loggedinUser)
    setuserid(loggedinUserId)
  }, [])
  


  return (
    <div className='w-[100%] flex flex-col items-center gap-3 justify-center h-[100vh]'>
      <input className='w-[70%] px-4 py-2 text-black text-2xl font-semibold border-none rounded-md' placeholder='Heading' value={heading} onChange={(e) => setheading(e.target.value)} type="text" />
      <textarea className='w-[70%] px-4 py-2 text-black text-2xl font-semibold border-none rounded-md' placeholder='Caption' value={caption} onChange={(e) => setcaption(e.target.value)} type="text" />
      <select className='w-[70%] px-4 py-2 text-black text-2xl font-semibold border-none rounded-md' id="dropdown" onChange={handleTagChange} value={tag}>
        <option value="" disabled>Select a tag</option>
        <option value="General">General</option>
        <option value="Education">Education</option>
        <option value="Politics">Politics</option>
        <option value="Sports">Sports</option>
        <option value="Business">Business</option>
        <option value="Technology">Technology</option>
      </select>
      <button className='w-[70%] font-semibold px-4 py-2 bg-green-600 text-white border-none rounded-md' onClick={handleNewPost}>Upload Blog</button>

    </div>
  )
}

export default CreatePost