import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      const res =
        mode === "login"
          ? await login(email, password)
          : await signup(email, password);

      // ✅ Axios response handling
      const { token, user } = res.data;

      // 🔥 REQUIRED: persist auth state
      localStorage.setItem("vl_token", token);
      localStorage.setItem("vl_user", JSON.stringify(user));

      // redirect
      nav("/dashboard");
    } catch (err) {
      console.error("Login error", err);
      setErr(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          {mode === "login" ? "Log in" : "Create account"}
        </h2>

        {err && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            {mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-blue-600 font-medium hover:underline"
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
