import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await registerUser(formData);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* GLASS CARD */}

      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md"
      >

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Create Account 🚀
        </h1>

        <p className="text-zinc-300 text-center mb-8">
          Sign up to get started
        </p>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-zinc-300 outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-zinc-300 outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-zinc-300 outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 transition p-4 rounded-xl font-semibold text-white"
          >
            Sign Up
          </button>

        </div>

        <p className="text-zinc-300 text-center mt-6">
          Already have an account?
          <Link
            to="/"
            className="text-pink-400 ml-2 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;