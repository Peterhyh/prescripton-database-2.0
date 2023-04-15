import React from 'react';
import './App.css';
import NewRxPage from './pages/NewRxPage';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterUserPage';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/newRx' element={<NewRxPage />} />
        <Route path='/registerUser' element={<RegisterUserPage />} />
      </Routes>
    </div>
  );
}

export default App;
