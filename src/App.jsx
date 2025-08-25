import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from "react-redux";
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';
import VantaBackground from "./components/VantaBackground";
import Premium from './components/Premium';
import ChatList from './components/ChatList';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProtectedRoute from './components/ProtectedRoute';
import Chat from './components/Chat';

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <VantaBackground>
          <div className="relative z-10 min-h-screen" style={{ position: "relative", zIndex: 5 }}>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Feed />
                    </ProtectedRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="connections"
                  element={
                    <ProtectedRoute>
                      <Connections />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="premium"
                  element={
                    <ProtectedRoute>
                      <Premium />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="requests"
                  element={
                    <ProtectedRoute>
                      <Requests />
                    </ProtectedRoute>
                  }
                />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                {/* Updated chat routes */}
                <Route
                  path="messages"
                  element={
                    <ProtectedRoute>
                      <ChatList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="chat/:targetuserId"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
                <Route path="privacy" element={<PrivacyPolicy />} />
              </Route>
            </Routes>
          </div>
        </VantaBackground>
      </BrowserRouter>
    </Provider>
  );
};

export default App;