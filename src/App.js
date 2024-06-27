import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import EditPost from './pages/EditPost'
import CreatePost from './pages/CreatePost'
import ErrorPage from './pages/ErrorPage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'
import RegsiterPage from './pages/RegsiterPage'
import PostRead from './pages/PostRead'
import AllPeople from './pages/AllPeople'
const App = () => {
  return (
    <>
      
    <Routes>
    <Route path='/'  element={ <HomePage/> }/>
    <Route path='/login'  element={ <LoginPage/> }/>
    <Route path='/register'  element={ <RegsiterPage/> }/>
    <Route path='/profile/:id'  element={ <ProfilePage/> }/>
    <Route path='/editpost/:id'  element={ <EditPost/> }/>
    <Route path='/addpost' element={ <CreatePost/>  } />
    <Route path='/*'  element={ <ErrorPage/> }/>
    <Route path='/author/:id'  element={ <UserPage/> }/>
    <Route path='/post/:id' element={ <PostRead/> } />
    <Route path='/allpeople'  element={ <AllPeople/> }/>
    </Routes>
    </>
  )
}

export default App