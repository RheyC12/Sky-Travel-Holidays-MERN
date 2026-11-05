import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      const redirectTo = location.state?.from?.pathname || (user.role === "admin" ? "/admin" : "/dashboard");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-20">
      <div className="mx-auto max-w-md px-6">
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-primary mb-1 text-center">Sign In</h1>
          <p className="text-center text-gray-500 text-sm mb-6">Access your visa applications and account.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email" required placeholder="Email address" className="input-field"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password" required placeholder="Password" className="input-field"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit" disabled={submitting} className="btn-brand w-full">
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account? <Link to="/register" className="text-secondary font-semibold">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
