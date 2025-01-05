import React, { useState } from "react";
import { MdDashboard, MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="shadow-md bg-white">
        <div className="flex justify-between items-center p-2 m-2">
          {/* Logo Section */}
          <NavLink to="/" className="text-2xl flex items-center gap-2 font-bold uppercase">
            <MdDashboard />
            <p className="text-secondary2">Seller</p>
            <p>Dashboard</p>
          </NavLink>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              <NavLink to="/">
                <li className="inline-block py-1 px-3 hover:text-primary2 font-semibold">
                  HOME
                </li>
              </NavLink>
              <NavLink to="/about">
                <li className="inline-block py-1 px-3 hover:text-primary2 font-semibold">
                  About
                </li>
              </NavLink>
              <NavLink to="/">
                <li className="inline-block py-1 px-3 hover:text-primary2 font-semibold">
                  Contact
                </li>
              </NavLink>
            </ul>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4">
            <button
              className="border-2 hover:border-primary2 text-white bg-primary2 font-semibold rounded-md px-6 py-2 duration-200 hidden md:block"
            >
              Become a Seller
            </button>

            <NavLink
              to="/login"
              className="hover:bg-primary2 text-primary2 font-semibold hover:text-white rounded-md border-2 border-primary2 px-6 py-2 duration-200 hidden md:block"
            >
              Login Market
            </NavLink>
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
      {open && (
        <div className="bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-4 text-gray-600 p-4">
            <NavLink to="/">
              <li className="py-2 px-4 hover:text-primary2 font-semibold">HOME</li>
            </NavLink>
            <NavLink to="/about">
              <li className="py-2 px-4 hover:text-primary2 font-semibold">About</li>
            </NavLink>
            <NavLink to="/">
              <li className="py-2 px-4 hover:text-primary2 font-semibold">Contact</li>
            </NavLink>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
