import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("customer"); // toggle between customer/admin

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url =
        active === "customer"
          ? "http://localhost:1000/login/customer"
          : "http://localhost:1000/login/admin";

      const payload = { email, password };

      const res = await axios.post(url, payload);

      // Check if backend returns role, if not set manually based on active state
      const userRole = res.data.role || active;

      // Prepare user data for localStorage
      const userData = {
        token: res.data.token,
        role: userRole,
        ...(res.data.customer || res.data.admin || {}), // spread details if exist
      };

      localStorage.setItem("customer", JSON.stringify(userData));

      alert(`${userRole} login successfully ✅`);

      // ✅ Navigate based on role
      if (userRole === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Invalid email or password ❌");
      } else {
        alert("Server error, please try again later ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        {/* Toggle Customer/Admin */}
        <div className="flex justify-center gap-8 mb-6">
          <button
            onClick={() => setActive("customer")}
            className={`px-12 py-3 rounded-xl font-semibold ${
              active === "customer"
                ? "bg-green-500 text-white"
                : "border-2 border-gray-300 text-gray-700"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setActive("admin")}
            className={`px-12 py-3 rounded-xl font-semibold ${
              active === "admin"
                ? "bg-green-500 text-white"
                : "border-2 border-gray-300 text-gray-700"
            }`}
          >
            Admin
          </button>
        </div>

        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {active === "customer" ? "Login Customer" : "Login Admin"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-green-600 font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
