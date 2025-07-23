import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Login from './Login';
import Profile from './Profile';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<div className="p-10"><h1 className="text-4xl font-bold text-center">Welcome to DevNexus!</h1></div>} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
         
        </Route>
      </Routes> 
    </BrowserRouter>
  );
};
 
export default App;
