import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsShopWindow } from "react-icons/bs";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import { AppContext } from "@/context/AppContext";
import Login from "../../pages/Login/Login";
import { NavLink, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Navbar must be used within an AppProvider");
  }

  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <nav>
        <div className="flex justify-between items-center py-4 bg-blue-100">
          {/* Logo Section */}
          <NavLink
            to="/"
            className="text-2xl flex items-center gap-2 font-bold uppercase ml-10"
          >
            <BsShopWindow />
            <p>Virtual</p>
            <p className="text-purple-800">Shop</p>
          </NavLink>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              <NavLink to="/">
                <li className="inline-block py-1 px-3 hover:underline hover:text-purple-800 font-semibold">
                  HOME
                </li>
                {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/> */}
              </NavLink>
              <NavLink to="/market">
                <li className="inline-block py-1 px-3 hover:underline hover:text-purple-800 font-semibold">
                  All Market
                </li>
                {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/> */}
              </NavLink>
              <NavLink to="/seller">
                <li className="inline-block py-1 px-3 hover:underline hover:text-purple-800 font-semibold">
                  Seller
                </li>
                {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/> */}
              </NavLink>
              <NavLink to="/about">
                <li className="inline-block py-1 px-3 hover:underline hover:text-purple-800 font-semibold">
                  About
                </li>
                {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/> */}
              </NavLink>
            </ul>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="text-2xl hover:bg-primary2 hover:text-white rounded-full p-2 duration-200"
            >
              <CiSearch />
            </button>
            <button
              aria-label="Search"
              className="text-2xl hover:bg-primary2 hover:text-white rounded-full p-2 duration-200"
            >
              <IoNotificationsOutline />
            </button>
            <button
              aria-label="Cart"
              className="text-2xl hover:bg-primary2 hover:text-white rounded-full p-2 duration-200"
            >
              <PiShoppingCartThin />
            </button>
            <button
              onClick={() => window.open("http://localhost:5174/", "_blank")}
              className="border-2 hover:border-primary2 text-white bg-primary2 font-semibold rounded-md px-6 py-2 duration-200 hidden md:block"
            >
              Business
            </button>

            {userData ? (
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group mr-10">
                {userData.name[0].toUpperCase()}
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                  <ul className="list-none  m-0 p-2 bg-gray-100 text-sm">
                    {!userData.isAccountVerified && (
                      <li
                        onClick={sendVerificationOtp}
                        className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                      >
                        Verify email
                      </li>
                    )}

                    <li
                      onClick={logout}
                      className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hover:bg-primary2 mr-10 text-primary2 font-semibold hover:text-white rounded-md border-2 border-primary2 px-6 py-2 duration-200 hidden md:block"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="text-4xl"
            >
              <MdMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <ResponsiveMenu open={open} onClose={() => setOpen(false)} />
      {/* Login Modal */}
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Navbar;

// import React, { useContext } from 'react'
// import {assets} from '../../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Navbar = () => {

//   const navigate = useNavigate()
//   const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContext)

//   const sendVerificationOtp = async ()=> {
//     try {
//       axios.defaults.withCredentials = true;

//       const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

//       if (data.success) {
//         navigate('/verify-email')
//         toast.success(data.message)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   const logout = async ()=> {
//     try {
//       axios.defaults.withCredentials = true
//       const {data} = await axios.post(backendUrl + '/api/auth/logout')
//       data.success && setIsLoggedin(false)
//       data.success && setUserData(false)
//       navigate('/')
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   return (
//     <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
//       <img src={assets.logo} alt="" className='w-28 sm:w-32'/>
//       {userData ?
//       <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
//         {userData.name[0].toUpperCase()}
//         <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
//           <ul className='list-none  m-0 p-2 bg-gray-100 text-sm'>
//             {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>}

//             <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
//           </ul>
//         </div>
//       </div>
//       :<button onClick={()=>navigate('/login')} className="hover:bg-primary2 text-primary2 font-semibold hover:text-white rounded-md border-2 border-primary2 px-6 py-2 duration-200 hidden md:block">Login</button>
//       }

//     </div>
//   )
// }

// export default Navbar