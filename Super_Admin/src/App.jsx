import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';

const App = () => {
  return (
    <div style={{ backgroundColor: '#0E1625', minHeight: '100vh', color: '#fff' }}>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
