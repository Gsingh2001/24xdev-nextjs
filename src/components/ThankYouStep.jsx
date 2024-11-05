import { useTheme } from '@/app/assets/ThemeContext';
import React from 'react';

const ThankYouStep = () => {
  const { isDarkMode } = useTheme(); // Access dark mode state

  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
        Thank You!
      </h2>
      <p className={`mb-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        We appreciate your interest in our services. One of our team members will contact you shortly.
      </p>
      <p className={`mb-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        For any inquiries, feel free to reach out to us at: <strong>gsingh07@outlook.in</strong>
      </p>
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Why Choose Us?
      </h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
        At our company, we are committed to providing the best service to our clients. Our privacy policy ensures that your information is kept confidential, and we promise the best prices in the market.
      </p>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        With our affordable timekeeping services, you can focus on what matters most—growing your business. We strive to deliver timely, professional, and reliable service tailored to your needs.
      </p>
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Our Commitment
      </h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
        We guarantee that you will receive exceptional support and quality services. Your satisfaction is our top priority.
      </p>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        Thank you once again for choosing us. We look forward to working with you!
      </p>
    </div>
  );
};

export default ThankYouStep;
