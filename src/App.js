import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import UserProfile from './components/UserProfile/UserProfile'; 
import SignUp from './components/Signup/SignUp';
import { UserProvider } from './context/UserContext'; 
import NavBar from './components/NavBar'; 

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profiles" element={<UserProfile />} />
          </Routes>
      </BrowserRouter>
    </UserProvider> 
  );
}

export default App;
