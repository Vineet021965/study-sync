import {
  FaHome,
  FaGlobe,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Public Feed",
      path: "/public",
      icon: <FaGlobe />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {/* OVERLAY */}

      {
        sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          ></div>
        )
      }

      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 backdrop-blur-xl bg-zinc-900/95 border-r border-white/10 z-50 transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="p-6">

          {/* LOGO */}

          <div className="mb-10">

            <h1 className="text-2xl sm:text-3xl font-bold text-green-400">
              StudySync 🚀
            </h1>

            <p className="text-zinc-400 mt-2 text-sm sm:text-base">
              Productivity Platform
            </p>

          </div>

          {/* MENU */}

          <div className="space-y-3">

            {menuItems.map((item) => (

              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition ${
                  location.pathname === item.path
                    ? "bg-green-500 text-white"
                    : "hover:bg-white/10 text-zinc-300"
                }`}
              >

                <span className="text-xl">
                  {item.icon}
                </span>

                <span className="text-base sm:text-lg">
                  {item.name}
                </span>

              </Link>
            ))}

          </div>

        </div>

      </div>
    </>
  );
}

export default Sidebar;