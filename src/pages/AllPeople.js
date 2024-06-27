import axios from "axios";
import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";

const AllPeople = () => {
  const navigate = useNavigate()
  const [allUsers, setallUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://mernstackblogapp-backend.onrender.com/user/fetchUsers"
      );
      const yuavraj = localStorage.getItem("userid")
      const filteredArray = response.data.filter((user) => user._id !== yuavraj);
      setallUsers(filteredArray);
      console.log(filteredArray); // Update allUsers state with filtered array
      setLoading(false);
    } catch (error) {
      setLoading(false); // Set loading to false in case of error
    }
  };


  useEffect(() => {
   const logedin = localStorage.getItem('user')
   if(!logedin){
     alert("Login Needed")
     navigate("/")
   }
    fetchUsers();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Navbar/>
      <div className='px-[10px] flex-grow py-[10px] w-[100%] flex items-center justify-center flex-wrap gap-2'>
       {allUsers.map(users => {
        return(<>
          <ProfileCard 
          userId = {users._id}
          name = {users.name}
          email = {users.email}
           />
        </>)
       })}
      </div>
      
    </>
  );
};

export default AllPeople;
