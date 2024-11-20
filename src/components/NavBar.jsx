"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "@/app/assets/ThemeContext"; // Replace with your actual ThemeContext path

const NavBar = () => {
  const { isDarkMode, toggleDarkMode, currentTheme } = useTheme(); // Get the theme context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null); // Reference for the mobile menu

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      style={{
        background: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
      className="text-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:flex-row md:space-x-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/img/main-logo.png"
              alt="Logo"
              className="w-auto"
              width={80}
              height={80}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-grow justify-end items-center">
            <div className="flex space-x-6 me-4">
              <Link
                href="/"
                className={`hover:bg-blue-700 ${
                  isDarkMode ? "text-white" : "text-black"
                } px-4 py-2 rounded-lg transition hover:text-white`}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className={`hover:bg-blue-700 ${
                  isDarkMode ? "text-white" : "text-black"
                } px-4 py-2 rounded-lg transition hover:text-white`}
              >
                Blogs
              </Link>
              <Link
                href="/gettingstarted"
                className={`ml-4 p-2 rounded-lg ${
                  isDarkMode ? "bg-gray-600" : "bg-gray-800"
                } hover:bg-gray-700 transition`}
                style={{ color: currentTheme.colors.buttonText }}
              >
                Getting Started
              </Link>
            </div>

            {/* Dark Mode Toggle */}
            <label className="theme-switch cursor-pointer ml-4">
              <input
                type="checkbox"
                className="theme-switch__checkbox"
                onChange={toggleDarkMode}
                checked={isDarkMode}
              />
              <div className="theme-switch__container">
                {/* Theme switch styles */}
                <div className="theme-switch__clouds"></div>
                <div className="theme-switch__stars-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 144 55"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="..."
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="theme-switch__circle-container">
                  <div className="theme-switch__sun-moon-container">
                    <div className="theme-switch__moon">
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className={`text-white focus:outline-none ${
                isDarkMode ? "bg-gray-600" : "bg-gray-800"
              } p-2 rounded-lg hover:bg-gray-700 transition`}
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } ${currentTheme.colors.background}`}
      >
        <div className="px-4 py-3 space-y-1">
          <Link
            href="/"
            className={`block hover:bg-blue-700 ${
              isDarkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-lg transition hover:text-white`}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className={`block hover:bg-blue-700 ${
              isDarkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-lg transition hover:text-white`}
          >
            Blogs
          </Link>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`block w-full text-left ${
              isDarkMode ? "text-white" : "text-black"
            } px-4 py-2 rounded-lg hover:bg-blue-700 transition`}
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
