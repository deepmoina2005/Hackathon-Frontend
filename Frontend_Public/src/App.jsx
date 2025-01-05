import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './mainComponents/Navbar/Navbar'
import Footer from './mainComponents/Footer'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App