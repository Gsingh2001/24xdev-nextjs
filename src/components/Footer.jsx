"use client"; // Ensure to enable client-side rendering

import React from 'react';
import Link from 'next/link'; // Use Link from Next.js
import { useTheme } from '@/app/assets/ThemeContext';

const Footer = () => {
  const { isDarkMode, currentTheme } = useTheme(); // Get the dark mode state and current theme

  return (
    <footer className={`py-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`} style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-1/2 p-4">
                <FooterInfo />
                <FooterNewsletter />
              </div>
              <div className="w-full sm:w-1/2 p-4">
                <FooterLinks />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <ContactForm />
          </div>
        </div>
      </div>
      <FooterBottom />
    </footer>
  );
};

const FooterInfo = () => {
  const { isDarkMode, currentTheme } = useTheme(); // Get theme context

  return (
    <div>
      <h3 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>24XDEV</h3>
      <p style={{ color: currentTheme.colors.text }}>
        At 24XDEV, we provide a complete, end-to-end solution for all your website needs. From bespoke web design to seamless development, reliable hosting, efficient deployment, and round-the-clock maintenance, our goal is to ensure your digital presence is not only attractive but also highly functional and secure. Serving clients across India, the UK, and Canada, we make web solutions accessible and reliable for all.
      </p>
    </div>
  );
};

const FooterNewsletter = () => {
  const { currentTheme } = useTheme(); // Get theme context

  return (
    <div>
      <h4 className="font-semibold" style={{ color: currentTheme.colors.text }}>Join Our Newsletter</h4>
      <p style={{ color: currentTheme.colors.text }}>Stay updated on the latest trends in website design, development, and digital solutions. Subscribe to our newsletter for insights, tips, and exclusive offers.</p>
      <form action="" method="post">
        <input type="email" name="email" placeholder="Enter your email" className="p-2 rounded-md border border-gray-300" />
        <input type="submit" value="Subscribe" className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" />
      </form>
    </div>
  );
};

const FooterLinks = () => {
  const { currentTheme } = useTheme(); // Get theme context

  return (
    <div>
      <h4 className="font-semibold" style={{ color: currentTheme.colors.text }}>Useful Links</h4>
      <ul className="list-disc pl-5">
        <li><Link href="/" className="hover:underline" style={{ color: currentTheme.colors.text }}>Home</Link></li>
        <li><Link href="/about" className="hover:underline" style={{ color: currentTheme.colors.text }}>About Us</Link></li>
        <li><Link href="/services" className="hover:underline" style={{ color: currentTheme.colors.text }}>Services</Link></li>
        <li><Link href="/terms" className="hover:underline" style={{ color: currentTheme.colors.text }}>Terms of Service</Link></li>
        <li><Link href="/privacy" className="hover:underline" style={{ color: currentTheme.colors.text }}>Privacy Policy</Link></li>
      </ul>
      <h4 className="font-semibold mt-4" style={{ color: currentTheme.colors.text }}>Contact Us</h4>
      <p style={{ color: currentTheme.colors.text }}>
        24XDEV HQ <br />
        New York, NY 535022 <br />
        United States <br />
        <strong style={{ color: currentTheme.colors.text }}>Phone:</strong> +1 5589 55488 55 <br />
        <strong style={{ color: currentTheme.colors.text }}>Email:</strong> contact@24xdev.com <br />
      </p>
      <SocialLinks />
    </div>
  );
};

const SocialLinks = () => {
  const { currentTheme } = useTheme(); // Get theme context

  return (
    <div className="flex space-x-4 mt-4">
      <Link href="#" className="hover:text-blue-500" style={{ color: currentTheme.colors.text }}><i className="fa fa-twitter"></i></Link>
      <Link href="#" className="hover:text-blue-500" style={{ color: currentTheme.colors.text }}><i className="fa fa-facebook"></i></Link>
      <Link href="#" className="hover:text-blue-500" style={{ color: currentTheme.colors.text }}><i className="fa fa-instagram"></i></Link>
      <Link href="#" className="hover:text-blue-500" style={{ color: currentTheme.colors.text }}><i className="fa fa-linkedin"></i></Link>
    </div>
  );
};

const ContactForm = () => {
  const { currentTheme } = useTheme(); // Get theme context

  return (
    <div>
      <h4 className="font-semibold" style={{ color: currentTheme.colors.text }}>Send Us a Message</h4>
      <p style={{ color: currentTheme.colors.text }}>Got a question? Whether you need help with a project or want to learn more about our services, feel free to reach out. We're here to assist clients from India, the UK, Canada, and beyond!</p>
      <form action="" method="post" className="space-y-4">
        <input type="text" name="name" className="w-full p-2 rounded-md border border-gray-300" placeholder="Your Name" />
        <input type="email" className="w-full p-2 rounded-md border border-gray-300" name="email" placeholder="Your Email" />
        <input type="text" className="w-full p-2 rounded-md border border-gray-300" name="subject" placeholder="Subject" />
        <textarea className="w-full p-2 rounded-md border border-gray-300" name="message" rows="5" placeholder="Message"></textarea>
        <div className="text-center">
          <button type="submit" className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Send Message</button>
        </div>
      </form>
    </div>
  );
};

const FooterBottom = () => (
  <div className="container mx-auto text-center py-4">
    <div className="text-gray-400">
      &copy; Copyright <strong>24XDEV</strong>. All Rights Reserved
    </div>
  </div>
);

export default Footer;
