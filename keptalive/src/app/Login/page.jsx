"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.userPassword || formData.userPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: formData.userEmail.toLowerCase(),
          userPassword: formData.userPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        window.location.href = "/";
      } else {
        const msg = data.message || "Invalid credentials. Please try again.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = "An error occurred. Please try again later.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Login
          </h1>
          <p className="text-[#8A8A8A] text-sm">Welcome back to our store</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-[#BFC3C7]" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.userEmail}
              onChange={(e) => handleInputChange("userEmail", e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-[#BFC3C7] rounded-lg text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-[#BFC3C7]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.userPassword}
              onChange={(e) => handleInputChange("userPassword", e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-12 border border-[#BFC3C7] rounded-lg text-sm focus:outline-none focus:border-black transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-[#BFC3C7] hover:text-black transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-bold text-sm tracking-widest hover:bg-[#2B2B2B] transition disabled:opacity-50"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-[#8A8A8A] text-sm">
            Don't have an account?{" "}
            <Link href="/Signup" className="text-black font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
