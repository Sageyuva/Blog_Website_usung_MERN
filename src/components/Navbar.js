import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/navstyle.css"
import { SquarePen } from 'lucide-react';
import {Menu , X} from 'lucide-react'
const Navbar = () => {
   const [menua, setmenua] = useState(true)
   const [userId, setuserId] = useState("")

  const [userloggedin, setuserloggedin] = useState(false)

  const handleLogOut = () => {
    localStorage.clear()
    setuserloggedin(false)
    alert("User Logedout")
    window.location.reload()
  }


  const handleManuA = () => {
    setmenua(!menua)
  }


  useEffect(() => {


    const loggedinUser = localStorage.getItem('user');
    const UserId = localStorage.getItem("userid")
    setuserId(UserId)
    
    if(loggedinUser){
  setuserloggedin(true)
    }
  }, [])

  return (

    <>
    <div className='navbar-container'>
      <Link className='logo' to="/"> <p >SAGE<span className='text-black'>Blogs</span> </p></Link>

<div onClick={handleManuA} className='menu'>
{menua ? <Menu/>  :<X/>}
</div>

      <ul className={menua ? 'list-container' : 'listcontainerA'}>
  {userloggedin ? (
    <>
      <Link to={`/profile/${userId}`}><li className='list-menu'>Profile</li></Link>
      <Link to="/allpeople"><li className='list-menu'>Authors</li></Link>
      <li onClick={handleLogOut} className='list-menuR'>Logout</li>
    </>
  ) : (
    <li className='login-btn'><Link to="/login">Login</Link></li>
  )}
</ul>

    </div>
    <div className='w-[100%] h-[60px]'></div>
    {userloggedin ? <Link to="/addpost" className="newpost-btn"> <SquarePen/> New Blog </Link> : null }
</>
  )
}

export default Navbar