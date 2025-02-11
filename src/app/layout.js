import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css"; // Ensure you have this CSS file for global styles
import { ThemeProvider } from "./assets/ThemeContext"; // Importing ThemeProvider for theme management
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "24XDEV - Your Trusted Partner in Comprehensive Web Solutions",
  description:
    "24XDEV offers a full suite of web solutions including web development, design, hosting, deployment, and maintenance to elevate your digital presence. Our dedicated team provides tailored services for a seamless experience.",
  keywords:
    "web development, web design, hosting solutions, website deployment, website maintenance, all-in-one web solutions, 24XDEV",
  author: "24XDEV",
  robots: "index, follow",
  openGraph: {
    title: "24XDEV - Your Trusted Partner in Comprehensive Web Solutions",
    description:
      "24XDEV is committed to delivering tailored web solutions, offering web development, design, hosting, deployment, and maintenance for a strong digital presence.",
    images: ["/img/main-logo.png"],
    url: "https://24xdev.co.uk",
    type: "website",
    siteName: "24XDEV",
  },
  twitter: {
    card: "summary_large_image",
    title: "24XDEV - Your Trusted Partner in Comprehensive Web Solutions",
    description:
      "Discover our suite of services at 24XDEV, dedicated to enhancing your website's performance with custom solutions.",
    images: ["/img/main-logo.png"],
  },
  // Structured Data (JSON-LD) for Organization
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "24XDEV",
    url: "https://24xdev.co.uk",
    logo: "/img/main-logo.png",
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
        <ToastContainer />
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
