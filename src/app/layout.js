"use client"
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader"; // Import the Loader component
import "./globals.css";
import { ThemeProvider } from "./assets/ThemeContext";
import Head from "next/head";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading time or fetch initial data
    const timer = setTimeout(() => setIsLoading(false), 2000); // Set to 2 seconds for example
    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>24XDEV - Your Trusted Partner in Comprehensive Web Solutions</title>
        <link rel="manifest" href="/img/site.webmanifest" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="24XDEV offers a full suite of web solutions including web development, design, hosting, deployment, and maintenance to elevate your digital presence. Our dedicated team provides tailored services for a seamless experience." />
        <meta name="keywords" content="web development, web design, hosting solutions, website deployment, website maintenance, all-in-one web solutions, 24XDEV" />
        <meta name="author" content="24XDEV" />
        <meta property="og:title" content="24XDEV - Your Trusted Partner in Comprehensive Web Solutions" />
        <meta property="og:description" content="24XDEV is committed to delivering tailored web solutions, offering web development, design, hosting, deployment, and maintenance for a strong digital presence." />
        <meta property="og:image" content="/img/main-logo.jpg" />
        <meta property="og:url" content="https://24xdev.uk" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="24XDEV - Your Trusted Partner in Comprehensive Web Solutions" />
        <meta name="twitter:description" content="Discover our suite of services at 24XDEV, dedicated to enhancing your website's performance with custom solutions." />
        <meta name="twitter:image" content="/img/main-logo.jpg" />
      </Head>
      <body>
        <ThemeProvider>
          {isLoading ? (
            <div className="loader-container fixed inset-0 flex items-center justify-center bg-white z-50">
              <Loader />
            </div>
          ) : (
            <>
              <NavBar />
              {children}
              <Footer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
