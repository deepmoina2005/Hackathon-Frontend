import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './mainComponents/navbar'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='m-0 p-0'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App