import NavBar from "@/components/NavBar";
import "./globals.css";
import { ThemeProvider } from "./assets/ThemeContext";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
