"use client";
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { toast } from "react-toastify";
import Image from 'next/image';
import { useTheme } from "@/app/assets/ThemeContext"; // Import the theme context

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentTheme } = useTheme(); // Access the current theme

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      sessionStorage.setItem('accessToken', idToken);

      toast("Login successful!");
    } catch (err) {
      setError('Invalid email or password');
      toast("Login failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
      {/* Image Section */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <Image src="/img/main-logo.png" width="2400" height="2000" alt="Login Page Image" className="w-full h-full object-cover" />
      </div>

      {/* Login Form Section */}
      <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: currentTheme.colors.neutralLight }}>
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-3xl font-bold text-center" style={{ color: currentTheme.colors.header }}>Login</h2>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium" style={{ color: currentTheme.colors.text }}>Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
                style={{
                  borderColor: currentTheme.colors.border,
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text,
                }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium" style={{ color: currentTheme.colors.text }}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 px-4 py-2 w-full border rounded-md shadow-sm"
                style={{
                  borderColor: currentTheme.colors.border,
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text,
                }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: currentTheme.colors.buttonText,
                  borderColor: currentTheme.colors.border,
                }}
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
