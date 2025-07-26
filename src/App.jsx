import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import {Provider} from "react-redux";
import appStore from './utils/appStore';
import Feed from './components/Feed';

const App = () => {
  return (
    <Provider store={appStore}>
    <BrowserRouter>
      <Routes>
        {/* Login route - accessible without authentication */}
        <Route path="/login" element={<Login />} />
        
        {/* All other routes go through Body component which handles authentication */}
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes> 
    </BrowserRouter>
    </Provider>
  );
};
 
export default App;
