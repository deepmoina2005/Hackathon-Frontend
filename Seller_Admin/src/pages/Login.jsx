import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Initialize the hook
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Details:", credentials);
    // Add authentication logic here
  };

  const handleExit = () => {
    navigate("/"); // Navigate to the home page or desired route
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-slate-100 bg-opacity-90 shadow-lg rounded-lg w-full max-w-lg p-8 relative">
        {/* Exit Button */}
        <button
          onClick={handleExit}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={credentials.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary2 border-gray-300 rounded focus:ring-primary2"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary2 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
