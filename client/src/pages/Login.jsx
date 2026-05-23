import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await loginUser(formData);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* GLASS CARD */}

      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md"
      >

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-zinc-300 text-center mb-8">
          Sign in to continue
        </p>

        <div className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-zinc-300 outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-zinc-300 outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition p-4 rounded-xl font-semibold text-white"
          >
            Sign In
          </button>

        </div>

        <p className="text-zinc-300 text-center mt-6">
          New here?
          <Link
            to="/register"
            className="text-green-400 ml-2 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;