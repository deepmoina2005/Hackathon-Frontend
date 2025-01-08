import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Market from './pages/Market'
import Seller from './pages/Seller'
import About from './pages/About'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Login from './pages/Login/Login'
import VerifyEmail from './pages/Login/VerifyEmail'
import ResetPassword from './pages/Login/ResetPassword'

const App = () => {

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/market' element={<Market/>}/>
        <Route path='/seller' element={<Seller/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App