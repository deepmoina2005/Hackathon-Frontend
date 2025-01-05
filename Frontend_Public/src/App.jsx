import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './mainComponents/Navbar/Navbar'
import Footer from './mainComponents/Footer'
import Home from './pages/Home'
import Market from './pages/Market'
import Seller from './pages/Seller'
import About from './pages/About'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/market' element={<Market/>}/>
        <Route path='/seller' element={<Seller/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App