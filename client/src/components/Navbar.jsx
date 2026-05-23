import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="bg-zinc-900 text-white px-8 py-4 flex justify-between items-center">

      {/* LOGO */}

      <h1 className="text-2xl font-bold text-green-400">
        Student Tracker 🚀
      </h1>

      {/* LINKS */}

      <div className="flex gap-5 items-center">

        <Link
          to="/dashboard"
          className="hover:text-green-400"
        >
          Dashboard
        </Link>

        <Link
          to="/public"
          className="hover:text-green-400"
        >
          Public Feed
        </Link>

        <button
          onClick={logoutHandler}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;