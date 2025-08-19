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
import Particles from "react-tsparticles";
import Premium from './components/Premium';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProtectedRoute from './components/ProtectedRoute';
import Chat from './components/Chat';

const particlesOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 30 }, // Reduced from 40 for less distraction
    color: { value: "#38bdf8" },
    shape: { type: "circle" },
    opacity: { value: 0.15 }, // Reduced from 0.3 for subtlety
    size: { value: { min: 1, max: 4 } }, // Smaller particles
    move: { 
      enable: true, 
      speed: 0.8, // Slower movement
      direction: "none", 
      outModes: { default: "bounce" } 
    },
    links: { 
      enable: true, 
      color: "#38bdf8", 
      opacity: 0.1, // More subtle links
      distance: 100 // Closer links
    }
  },
  detectRetina: true
};

const App = () => {
  return (
  <Provider store={appStore}>
        <BrowserRouter>
          <div
            style={{
              minHeight: "100vh",
              width: "100vw",
              backgroundImage: "url('/dev.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative"
            }}
          >
            {/* Enhanced overlay for better card visibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.65)", // Increased opacity from 0.45 to 0.65
                zIndex: 2,
                pointerEvents: "none"
              }}
            />
            
            {/* Additional gradient overlay for depth */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.6) 50%, rgba(51,65,85,0.4) 100%)",
                zIndex: 3,
                pointerEvents: "none"
              }}
            />
            
            {/* Particles with reduced visibility */}
            <Particles
              id="tsparticles"
              options={particlesOptions}
              style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}
            />
            
            {/* Main content */}
            <div className="relative z-10" style={{ position: "relative", zIndex: 5 }}>
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
                  <Route path="chat/:targetuserId" element={<Chat/>} />
                  <Route path="privacy" element={<PrivacyPolicy />} />
                </Route>
              </Routes>
            </div>
          </div>
  </BrowserRouter>
    </Provider>
  );
};

export default App;