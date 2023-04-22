import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import RegisterPage from './pages/RegisterPage';
import NewRxPage from './pages/NewRxPage';
import RequireAuth from './components/RequireAuth';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        <Route path='newPatient' element={<RegisterPatientPage />} />
        <Route path='newRx' element={<NewRxPage />} />
      </Route>
    </Routes>
  );
}

export default App;
