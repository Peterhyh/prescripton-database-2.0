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
import Users from './components/Users';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />


        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path='newPatient' element={<RegisterPatientPage />} />
          <Route path='newRx' element={<NewRxPage />} />
        </Route>

        {/* Catch Other Routes */}
        {/* <Route path='*' element={<MissingPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
