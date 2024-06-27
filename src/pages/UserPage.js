import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UserPage = () => {


  const [userData, setuserData] = useState([])


  const fetchUsers = async() => {
    try {
      const usersResponse = await axios.get('https://mernstackblogapp-backend.onrender.com/user/fetchUsers');
      const usersData = usersResponse.data;
  
      // Assuming userIdToFilter is the ID you want to filter out
      const userIdToFilter = "664602cc9c349ab69b6e9d07"; // Example ID
      
      // Filter out the user by ID
      const filteredUsers = usersData.filter(user => user._id !== userIdToFilter);
      
      // Now, filteredUsers will contain users except the one with userIdToFilter
      
      // You can do whatever you want with filteredUsers, such as setting state
      setuserData(filteredUsers);
      
      console.log(filteredUsers);
      alert("Users fetched");
    } catch (error) {
      console.log("Error fetching users:", error);
      alert("Error while fetching users");
    }
  }
  

  useEffect(() => {
    
  fetchUsers()

  }, [])
  

  return (
    <div>UserPage</div>
  )
}

export default UserPage