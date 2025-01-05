import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './mainComponents/Navbar/Navbar'
import Footer from './mainComponents/Footer'
import Home from './pages/Home'
import Market from './pages/Market'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/market' element={<Market/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App