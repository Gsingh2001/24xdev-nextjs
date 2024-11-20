import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css"; // Ensure you have this CSS file for global styles
import { ThemeProvider } from "./assets/ThemeContext"; // Importing ThemeProvider for theme management
import Head from "next/head"; // Import Head component from Next.js

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/favicon.ico" />
        <link rel="manifest" href="/img/site.webmanifest" />
        
        {/* SEO Meta Tags */}
        <title>24XDEV - Your Trusted Partner in Comprehensive Web Solutions</title>
        <meta name="description" content="24XDEV offers a full suite of web solutions including web development, design, hosting, deployment, and maintenance to elevate your digital presence. Our dedicated team provides tailored services for a seamless experience." />
        <meta name="keywords" content="web development, web design, hosting solutions, website deployment, website maintenance, all-in-one web solutions, 24XDEV" />
        <meta name="author" content="24XDEV" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="24XDEV - Your Trusted Partner in Comprehensive Web Solutions" />
        <meta property="og:description" content="24XDEV is committed to delivering tailored web solutions, offering web development, design, hosting, deployment, and maintenance for a strong digital presence." />
        <meta property="og:image" content="/img/main-logo.jpg" />
        <meta property="og:url" content="https://24xdev.uk" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="24XDEV" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="24XDEV - Your Trusted Partner in Comprehensive Web Solutions" />
        <meta name="twitter:description" content="Discover our suite of services at 24XDEV, dedicated to enhancing your website's performance with custom solutions." />
        <meta name="twitter:image" content="/img/main-logo.jpg" />

        {/* Structured Data (JSON-LD) for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "24XDEV",
              url: "https://24xdev.uk",
              logo: "/img/main-logo.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-555-5555",
                contactType: "Customer Service",
                areaServed: "Worldwide",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.facebook.com/24xdev",
                "https://twitter.com/24xdev",
                "https://www.linkedin.com/company/24xdev",
              ],
            }),
          }}
        />

        {/* Performance Optimization - Preconnect/Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kaisei+Tokumin:wght@400;700&display=swap" />

      </Head>
      <body>
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
