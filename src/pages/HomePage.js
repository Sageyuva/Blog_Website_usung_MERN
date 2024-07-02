import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [activeButton, setActiveButton] = useState('All');
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const buttonClasses = (button) =>
    `px-3 py-1 font-[600] border-none rounded-full ${
      activeButton === button ? 'bg-[#6636c2]' : 'bg-[#4a4a4a]'
    } text-white`;

  const handleAllClick = () => {
    setFilteredBlogs(allBlogs);
  };

  const handleGeneralClick = () => {
    const filtered = allBlogs.filter(blog => blog.tag === 'General');
    setFilteredBlogs(filtered);
  };

  const handleEducationClick = () => {
    const filtered = allBlogs.filter(blog => blog.tag === 'Education');
    setFilteredBlogs(filtered);
  };

  const handlePoliticsClick = () => {
    const filtered = allBlogs.filter(blog => blog.tag === 'Politics');
    setFilteredBlogs(filtered);
  };

  const handleSportsClick = () => {
    const filtered = allBlogs.filter(blog => blog.tag === 'Sports');
    setFilteredBlogs(filtered);
  };

  const handleBusinessClick = () => {
    const filtered = allBlogs.filter(blog => blog.tag === 'Business');
    setFilteredBlogs(filtered);
  };

  const handleTechnologyClick = () => {
    const filtered = allBlogs.filter(blog => blog.tag === 'Technology');
    setFilteredBlogs(filtered);
  };

  const buttons = [
    { label: 'All', onClick: handleAllClick },
    { label: 'General', onClick: handleGeneralClick },
    { label: 'Education', onClick: handleEducationClick },
    { label: 'Politics', onClick: handlePoliticsClick },
    { label: 'Sports', onClick: handleSportsClick },
    { label: 'Business', onClick: handleBusinessClick },
    { label: 'Technology', onClick: handleTechnologyClick },
  ];

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("https://mernstackblogapp-backend.onrender.com/post/allposts");
      const reversedData = response.data.reverse();
      setAllBlogs(reversedData);
      setFilteredBlogs(reversedData);
      setLoading(false);
    } catch (error) {
      alert("Server Issue");
      localStorage.clear();
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAllPosts();
    const loggedinUser = localStorage.getItem('user');
    const expirationTime = localStorage.getItem('expirationTime');
    if(loggedinUser && expirationTime && new Date().getTime() < expirationTime) {
      navigate("/")
    } else {
      localStorage.removeItem('user'); // Clear localStorage if session expired
      localStorage.removeItem('userid');
      localStorage.removeItem('expirationTime');
    }


  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>

      <Navbar />
      <div className='w-[100%] h-[50px] fixed overflow-scroll flex px-3 py-2 gap-3'>
        {buttons.map((button) => (
          <button
            key={button.label}
            className={buttonClasses(button.label)}
            onClick={() => {
              setActiveButton(button.label);
              button.onClick();
            }}
          >
            {button.label}
          </button>
        ))}
      </div>
    <div className='w-[100%] h-[50px]'></div>
      <div className='px-[10px] flex-grow py-[10px] w-[100%] flex items-center justify-center flex-wrap gap-2'>
        {filteredBlogs.map((blogg) => (
          <PostCard
            key={blogg._id}
            Postid={blogg._id}
            user={blogg.username}
            email={blogg.tag}
            heading={blogg.heading}
            caption={blogg.caption}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
