import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsShopWindow } from "react-icons/bs";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";
import { AppContext } from "@/context/AppContext";
import Login from "../Login/Login"; // Import LoginModal
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Navbar must be used within an AppProvider");
  }

  const { user, setShowLogin } = context;
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-8 border-b">
          {/* Logo Section */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <BsShopWindow />
            <p>Virtual</p>
            <p className="text-secondary2">Shop</p>
          </div>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              <NavLink to="/">
                <li className="inline-block py-1 px-3 hover:text-primary2 font-semibold">
                  HOME
                </li>
                {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/> */}
              </NavLink>
              <NavLink to="/market">
                <li className="inline-block py-1 px-3 hover:text-primary2 font-semibold">
                  All Market
                </li>
                {/* <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/> */}
              </NavLink>
              <NavLink to="/">
                <li className="inline-block py-1 px-3 hover:text-primary2 font-semibold">
                  HOME
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

            <button
              onClick={() => setShowLoginModal(true)}
              className="hover:bg-primary2 text-primary2 font-semibold hover:text-white rounded-md border-2 border-primary2 px-6 py-2 duration-200 hidden md:block"
            >
              Login
            </button>
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
