import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthPageDesign from "../components/AuthPageDesign";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h1>
          <input
            className="border border-gray-300 p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={login}
            className="bg-blue-600 text-white px-4 py-3 w-full rounded-lg cursor-pointer hover:bg-blue-800 transition font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Sign Up 
            </Link>
          </p>
        </div>
      </div>

      <AuthPageDesign tag="Log in to analyze, improve, and stand out in the job market." />
    </div>
  );
};

export default Login;
