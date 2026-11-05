import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const initialForm = { name: "", email: "", password: "", phone: "", nationality: "" };

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      toast.success("Account created! Welcome to Sky Travel Holidays.");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-20">
      <div className="mx-auto max-w-md px-6">
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-primary mb-1 text-center">Create Account</h1>
          <p className="text-center text-gray-500 text-sm mb-6">Apply for visas and track their status online.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" required placeholder="Full Name" className="input-field" value={form.name} onChange={handleChange} />
            <input name="email" type="email" required placeholder="Email address" className="input-field" value={form.email} onChange={handleChange} />
            <input name="password" type="password" required minLength={8} placeholder="Password (min 8 characters)" className="input-field" value={form.password} onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" className="input-field" value={form.phone} onChange={handleChange} />
            <input name="nationality" placeholder="Nationality" className="input-field" value={form.nationality} onChange={handleChange} />
            <button type="submit" disabled={submitting} className="btn-brand w-full">
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <Link to="/login" className="text-secondary font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
