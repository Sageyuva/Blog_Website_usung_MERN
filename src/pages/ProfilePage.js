import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Backdrop, CircularProgress } from "@mui/material";
import axios from 'axios';
import PostCard from '../components/PostCard';

const ProfilePage = () => {
   const navigate = useNavigate()
   const [userposts, setuserposts] = useState([])
   const [userProfile, setuserProfile] = useState([])
  const {id} = useParams()
  const userId = id
  const [loading, setLoading] = useState(true);


  const fetchUserData = async() => {
    try {
      const userData = await axios.post(`https://mernstackblogapp-backend.onrender.com/user/singleuser`, {userId})
      setuserProfile(userData.data)
      const userPosts = await axios.post("https://mernstackblogapp-backend.onrender.com/post/postofuser" ,{userId})
      setuserposts(userPosts.data)
      setLoading(false)
    } catch (error) {
      alert("Server is offline")
      navigate("/")
    }
  }


  useEffect(() => {
    fetchUserData()
  }, [])
  

  return (
<>
<Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop> 
      <div className='w-[100%} flex items-center justify-center'>
      {
        userProfile.map (usersprofile => {
          return(
            <div className=' flex items-center justify-center flex-col'>
          <div className=' flex items-center justify-center gap-3'>
          <img className='w-[50px] h-[50px] rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
          <p className='text-[#6636c2] font-semibold text-2xl'>    {usersprofile.name}</p>
       
          </div>
          <p className=' font-semibold text-2xl'>{usersprofile.email}</p>
        </div>
          )
        })
      }
      </div>
      <div className='px-[10px] flex-grow py-[10px] w-[100%] flex items-center justify-center flex-wrap gap-2'>
  {userposts.map(posts => {
    return(
    <>
      <PostCard 
      key={posts._id}
      Postid={posts._id}
      user={posts.username}
      email={posts.tag}
            heading={posts.heading}
            caption={posts.caption}
       />
    </>
    )
  })}
</div>
</>
  )
}

export default ProfilePage