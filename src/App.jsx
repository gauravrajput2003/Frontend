import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Navbar */}
      <div className="navbar bg-base-300 text-base-content shadow-md">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">👦DevNexus</a>
        </div>
        <div className="flex gap-2">
        
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li>
                <a className="justify-between">
                  Profile <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center">Hello Gaurav!</h1>
        <p className="text-center mt-4 text-lg">
          Welcome to your DaisyUI app with Synthwave theme!
        </p>
      </div>
    </div>
  );
};

export default App;
