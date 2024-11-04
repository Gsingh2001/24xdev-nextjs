"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Define light and dark mode colors
const lightMode = {
  colors: {
    text: '#2D3748', // Dark gray for text
    background: '#F7FAFC', // Very light gray background
    header: '#1A202C', // Deep charcoal for headers
    footer: '#4A5568', // Mid-gray for footer
    primary: '#2B6CB0', // Strong blue for primary actions
    primaryHover: '#3182CE', // Brighter blue on hover
    secondary: '#ED8936', // Warm orange for secondary elements
    accent: '#B794F4', // Soft lavender for accents
    neutralLight: '#E2E8F0', // Light neutral gray
    neutralDark: '#4A5568', // Darker gray for neutral elements
    buttonText: '#FFFFFF', // White text on buttons
    buttonBackground: '#38A169', // Deep green for buttons
    buttonHover: '#2F855A', // Slightly darker green on hover
    link: '#2B6CB0', // Consistent link color
    linkHover: '#3182CE', // Lighter blue on link hover
    border: '#CBD5E0', // Light gray border
    shadow: 'rgba(0, 0, 0, 0.1)', // Soft shadow for elements
    alertSuccess: '#48BB78', // Green for success messages
    alertError: '#F56565', // Red for error messages
    alertWarning: '#DD6B20', // Orange for warnings
    alertInfo: '#3182CE', // Blue for info alerts
    // Colors for 10 cards
    card1: { background: '#EDF2F7', text: '#2D3748', icon: '#FFFFFF', iconBackground: '#BEE3F8' },
    card2: { background: '#F7FAFC', text: '#2D3748', icon: '#FFFFFF', iconBackground: '#FBB6CE' },
    card3: { background: '#F0FFF4', text: '#1A202C', icon: '#FFFFFF', iconBackground: '#B2F5EA' },
    card4: { background: '#E2E8F0', text: '#1A202C', icon: '#FFFFFF', iconBackground: '#C6F6D5' },
    card5: { background: '#FFF5F5', text: '#1A202C', icon: '#FFFFFF', iconBackground: '#F6E05E' },
    card6: { background: '#FEEBC8', text: '#1A202C', icon: '#FFFFFF', iconBackground: '#D69E2E' },
    card7: { background: '#F7FAFC', text: '#2D3748', icon: '#FFFFFF', iconBackground: '#A0AEC0' },
    card8: { background: '#E6FFFA', text: '#1A202C', icon: '#FFFFFF', iconBackground: '#81E6D9' },
    card9: { background: '#FFF9FA', text: '#1A202C', icon: '#FFFFFF', iconBackground: '#FBB6CE' },
    card10: { background: '#FFF0F0', text: '#1A202C', icon: '#FFFFFF', iconBackground: '#F6B8B8' },
  },
};

const darkMode = {
  colors: {
    text: '#F7FAFC', // Light gray text
    background: '#2D3748', // Dark gray background
    header: '#4A5568', // Medium gray header
    footer: '#1A202C', // Deep gray footer
    primary: '#2B6CB0', // Strong blue for primary actions
    primaryHover: '#3182CE', // Lighter blue on hover
    secondary: '#ED8936', // Warm orange for secondary elements
    accent: '#B794F4', // Soft lavender for accents
    neutralLight: '#4A5568', // Darker gray for neutral elements
    neutralDark: '#1A202C', // Very dark gray for neutral elements
    buttonText: '#FFFFFF', // White text on buttons
    buttonBackground: '#38A169', // Deep green for buttons
    buttonHover: '#2F855A', // Darker green on hover
    link: '#FBB6CE', // Soft pink for links
    linkHover: '#FBB6CE', // Slightly darker pink on hover
    border: '#4A5568', // Dark gray border
    shadow: 'rgba(0, 0, 0, 0.5)', // Stronger shadow for dark mode
    alertSuccess: '#68D391', // Green for success messages
    alertError: '#FC8181', // Red for error messages
    alertWarning: '#F6E05E', // Yellow for warnings
    alertInfo: '#63B3ED', // Blue for info alerts
    // Colors for 10 cards
    card1: { background: '#4A5568', text: '#F7FAFC', icon: '#FFFFFF', iconBackground: '#B2F5EA' },
    card2: { background: '#F56565', text: '#FFFFFF', icon: '#FFFFFF', iconBackground: '#D69E2E' },
    card3: { background: '#1A202C', text: '#F7FAFC', icon: '#FFFFFF', iconBackground: '#A0AEC0' },
    card4: { background: '#2B6CB0', text: '#FFFFFF', icon: '#FFFFFF', iconBackground: '#4A5568' },
    card5: { background: '#4A5568', text: '#F7FAFC', icon: '#FFFFFF', iconBackground: '#B2F5EA' },
    card6: { background: '#2D3748', text: '#F7FAFC', icon: '#FFFFFF', iconBackground: '#38A169' },
    card7: { background: '#F7FAFC', text: '#2D3748', icon: '#FFFFFF', iconBackground: '#FBB6CE' },
    card8: { background: '#2D3748', text: '#F7FAFC', icon: '#FFFFFF', iconBackground: '#81E6D9' },
    card9: { background: '#2D3748', text: '#F7FAFC', icon: '#FFFFFF', iconBackground: '#FBB6CE' },
    card10: { background: '#F56565', text: '#FFFFFF', icon: '#FFFFFF', iconBackground: '#F6B8B8' },
  },
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(lightMode); // Default to light mode

  // Effect to update theme based on isDarkMode state
  useEffect(() => {
    setCurrentTheme(isDarkMode ? darkMode : lightMode);
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, currentTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
