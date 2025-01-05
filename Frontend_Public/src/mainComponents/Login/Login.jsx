import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../../public/assets/assets';

const AuthComponent = ({ onClose }) => {
  const [state, setState] = useState('Login'); // 'Login', 'Sign Up', 'Forgot Password', 'OTP Verification', 'Set New Password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { backendUrl, setToken, setUser } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Forgot Password') {
        const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, { email });
        if (data.success) {
          toast.success(data.message || 'Reset link sent to your email.');
          setState('Login');
        } else {
          toast.error(data.message || 'Failed to send reset link.');
        }
        return;
      }

      if (state === 'OTP Verification') {
        const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp });
        if (data.success) {
          toast.success('OTP verified. Set a new password.');
          setState('Set New Password');
        } else {
          toast.error(data.message || 'Invalid OTP.');
        }
        return;
      }

      if (state === 'Set New Password') {
        if (newPassword !== confirmPassword) {
          toast.error('Passwords do not match.');
          return;
        }
        const { data } = await axios.post(`${backendUrl}/api/user/update-password`, {
          email,
          newPassword,
        });
        if (data.success) {
          toast.success(data.message || 'Password updated.');
          setState('Login');
        } else {
          toast.error(data.message || 'Failed to update password.');
        }
        return;
      }

      if (state !== 'Login' && password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }

      const endpoint = state === 'Login' ? '/api/user/login' : '/api/user/register';
      const payload = state === 'Login' ? { email, password } : { name, email, password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success) {
        if (state === 'Sign Up') {
          toast.success('Registration successful. Verify OTP sent to your email.');
          setState('OTP Verification');
        } else {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          toast.success(data.message || 'Login successful!');
          onClose();
        }
      } else {
        toast.error(data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Server error.');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-10 rounded-xl shadow-lg max-w-sm w-full text-slate-500"
      >
        <h1 className="text-center text-2xl font-medium text-neutral-700 mb-4">{state}</h1>

        {state === 'Sign Up' && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-4">
            <img src={assets.user_icon} alt="Name" className="w-5 h-5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="outline-none flex-1 text-sm"
              required
            />
          </div>
        )}

        {(state === 'Sign Up' || state === 'Login' || state === 'Forgot Password') && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-4">
            <img src={assets.email_icon} alt="Email" className="w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="outline-none flex-1 text-sm"
              required
            />
          </div>
        )}

        {(state === 'Sign Up' || state === 'Login') && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-4">
            <img src={assets.lock_icon} alt="Password" className="w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="outline-none flex-1 text-sm"
              required
            />
          </div>
        )}

        {state === 'Sign Up' && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-4">
            <img src={assets.lock_icon} alt="Confirm Password" className="w-5 h-5" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="outline-none flex-1 text-sm"
              required
            />
          </div>
        )}

        {state === 'OTP Verification' && (
          <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-4">
            <img src={assets.otp_icon} alt="OTP" className="w-5 h-5" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="outline-none flex-1 text-sm"
              required
            />
          </div>
        )}

        {state === 'Set New Password' && (
          <>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-4">
              <img src={assets.lock_icon} alt="New Password" className="w-5 h-5" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="outline-none flex-1 text-sm"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-lg mt-4">
              <img src={assets.lock_icon} alt="Confirm New Password" className="w-5 h-5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="outline-none flex-1 text-sm"
                required
              />
            </div>
          </>
        )}

        {state === 'Login' && (
          <p className="text-right mt-4 text-sm">
            <span
              onClick={() => setState('Forgot Password')}
              className="text-primary2 cursor-pointer font-medium"
            >
              Forgot Password?
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-primary2 text-white py-2 rounded-lg w-full mt-4"
          aria-label={state}
        >
          {state === 'Forgot Password' ? 'Send Reset Link' : 'Submit'}
        </button>

        <p className="text-center mt-4 text-sm">
          {state === 'Login' ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-primary2 cursor-pointer font-medium"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-primary2 cursor-pointer font-medium"
              >
                Login
              </span>
            </>
          )}
        </p>

        <img
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
          onClick={onClose}
        />
      </motion.form>
    </div>
  );
};

export default AuthComponent;