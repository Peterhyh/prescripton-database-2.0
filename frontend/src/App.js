import React from 'react';
import './App.css';
import NewRxPage from './pages/NewRxPage';
import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import RegisterPage from './pages/RegisterPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/newRx' element={<NewRxPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/registerPatient' element={<RegisterPatientPage />} />
      </Routes>
    </div>
  );
}

export default App;
