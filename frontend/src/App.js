import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import RegisterPage from './pages/RegisterPage';
import NewRxPage from './pages/NewRxPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import HomePage from './pages/HomePage';



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<HomePage />} exact />
        <Route path='/newPatient' element={<RegisterPatientPage />} />
        <Route path='/newRx' element={<NewRxPage />} />
      </Route>
    </Routes>
  );
}

export default App;
