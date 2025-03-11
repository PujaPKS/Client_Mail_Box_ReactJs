import React from 'react'
import './App.css';
import Header from './components/header/Header';
import Signup from './components/login/SignUp';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import HomePage from './components/homePage/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div>
        <Header/>
        {/* <Login /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
          />
        </Routes>
    </div>
  )
}

export default App