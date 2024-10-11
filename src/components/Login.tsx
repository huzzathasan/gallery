import React, { useEffect, useState } from "react";
import { pb } from "../pb.config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      navigate("/_app-admin");
      console.log("Logged in User: ", authData);
    } catch (error) {
      console.log("Invalid Email or Password", error);
      setError("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate("/_app-admin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl">Login Admin</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
