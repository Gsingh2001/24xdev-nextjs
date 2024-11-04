import { useTheme } from '@/app/assets/ThemeContext';
import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const IntroductionToCEO = () => {
    const { currentTheme, isDarkMode } = useTheme(); // Get the current theme
    const ceo = {
        name: 'Gurmanpreet Singh',
        position: 'CEO and Director',
        location: 'Punjab, India',
        description: `Gurmanpreet Singh is a visionary leader with a commitment to excellence and innovation. Based in the United Kingdom, he brings years of expertise and dedication to drive our company forward.`,
        imgSrc: '/img/image_1728054253661.png', // Replace with an actual image URL
    };

    return (
        <section className="py-16 px-4 md:px-16" style={{ backgroundColor: currentTheme.colors.background }}>
            <div className={`flex flex-col lg:flex-row items-center justify-center mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-10 rounded-lg shadow-lg space-y-8 lg:space-y-0 lg:space-x-10`}>
                <div className="flex-shrink-0">
                    <img
                        src={ceo.imgSrc}
                        alt={ceo.name}
                        className="w-40 h-40 rounded-full border-4 border-blue-500 transform transition-transform duration-500"
                        style={{ transform: 'scale(1)' }} // Image scaling can be done via CSS
                    />
                </div>
                <div className={`text-center lg:text-left ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    <h3 className="text-3xl font-semibold">
                        {ceo.name}
                    </h3>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mb-4`}>
                        {ceo.position}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} mb-4`}>
                        {ceo.location}
                    </p>
                    <p className={`text-gray-300 ${isDarkMode ? 'mb-6' : 'mb-6'}`}>
                        {ceo.description}
                    </p>
                    <div className={`flex justify-center lg:justify-start space-x-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <a href="#" aria-label="LinkedIn" className="social-icon hover:text-blue-600">
                            <FaLinkedin size={28} />
                        </a>
                        <a href="#" aria-label="Twitter" className="social-icon hover:text-blue-400">
                            <FaTwitter size={28} />
                        </a>
                        <a href="#" aria-label="Email" className="social-icon hover:text-green-500">
                            <FaEnvelope size={28} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroductionToCEO;
