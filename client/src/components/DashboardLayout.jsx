import { useEffect, useRef, useState } from "react";

import { FaBars, FaUserCircle } from "react-icons/fa";

import Sidebar from "./Sidebar";

import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  // Close profile dropdown on outside click
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute w-96 h-96 bg-green-500 blur-3xl opacity-10 rounded-full top-10 left-10"></div>

      <div className="absolute w-96 h-96 bg-blue-500 blur-3xl opacity-10 rounded-full bottom-10 right-10"></div>

      {/* SIDEBAR */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* TOPBAR */}

      <div className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-lg bg-white/5">

        {/* MENU BUTTON */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl hover:text-green-400 transition"
        >
          <FaBars />
        </button>

        {/* PROFILE */}

        <div
          className="relative"
          ref={profileRef}
        >

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="text-4xl text-green-400 hover:scale-110 transition"
          >
            <FaUserCircle />
          </button>

          {/* DROPDOWN */}

          {
            profileOpen && (
              <div className="absolute right-0 top-16 w-64 backdrop-blur-xl bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl p-5 z-50">

                {/* USER INFO */}

                <div className="flex items-center gap-4">

                  <FaUserCircle className="text-5xl text-green-400" />

                  <div>

                    <h2 className="text-lg font-semibold">
                      Student User
                    </h2>

                    <p className="text-sm text-zinc-400">
                      student@gmail.com
                    </p>

                  </div>

                </div>

                {/* DIVIDER */}

                <div className="border-t border-white/10 my-4"></div>

                {/* OPTIONS */}

                <div className="space-y-2">

                  <button
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                  >
                    Profile
                  </button>

                  <button
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
                  >
                    Settings
                  </button>

                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-3 rounded-xl bg-red-500/80 hover:bg-red-600 transition"
                  >
                    Logout
                  </button>

                </div>

              </div>
            )
          }

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="relative z-10 p-8">

        {children}

      </div>

    </div>
  );
}

export default DashboardLayout;