// Features.js
import React, { useEffect, useState } from 'react';
import { BsArrowUpRightCircle } from 'react-icons/bs';

const Features = ({ currentTheme }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger visibility on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-6 md:py-10" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto px-4">
        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row h-full space-y-6 md:space-y-0 md:space-x-4">
          
          {/* First Column with One Card (50% width on large screens) */}
          <div
            className={`w-full md:w-1/2 flex flex-col transition-transform duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div 
              className="bg-cover bg-center rounded-lg shadow-lg flex-1 flex flex-col relative"
              style={{ backgroundImage: "url('/img/pexels-designecologist-1779487.jpg')" }}
            >
              <div className="bg-black bg-opacity-50 p-6 flex-1 flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-2">UX & UI Design with Development</h2>
                <p className="text-gray-200 mb-4">
                  Our team specializes in creating intuitive and engaging user experiences that drive conversion. We merge design with development for seamless results.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Getting Started</span>
                  <BsArrowUpRightCircle className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Second Column with Two Cards (50% width split on large screens, stacked on smaller screens) */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col space-y-6 md:space-y-4">
            <a
              href="#"
              className={`p-6 rounded-lg shadow-lg flex-1 flex flex-col hover:shadow-xl transition-shadow duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{
                backgroundColor: currentTheme.colors.card1.background,
                color: currentTheme.colors.card1.text,
              }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.primary }}>Web Development</h2>
              <p className="mb-4 flex-1" style={{ color: currentTheme.colors.card1.text }}>
                We build responsive and scalable web applications tailored to your business needs, ensuring optimal performance across devices.
              </p>
              <BsArrowUpRightCircle className="self-end" style={{ color: currentTheme.colors.primary }} size={24} />
            </a>

            <a
              href="#"
              className={`p-6 rounded-lg shadow-lg flex-1 flex flex-col hover:shadow-xl transition-shadow duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{
                backgroundColor: currentTheme.colors.card2.background,
                color: currentTheme.colors.card2.text,
              }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.secondary }}>Digital Marketing</h2>
              <p className="mb-4 flex-1" style={{ color: currentTheme.colors.card2.text }}>
                Our digital marketing strategies are designed to enhance your online presence and engage your target audience effectively.
              </p>
              <BsArrowUpRightCircle className="self-end" style={{ color: currentTheme.colors.secondary }} size={24} />
            </a>
          </div>

          {/* Third Column with One Card (25% width on large screens) */}
          <div className={`w-full lg:w-1/4 flex flex-col transition-transform duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a
              href="#"
              className={`p-6 rounded-lg shadow-lg flex-1 flex flex-col hover:shadow-xl transition-shadow duration-300`}
              style={{
                backgroundColor: currentTheme.colors.card3.background,
                color: currentTheme.colors.card3.text,
              }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.accent }}>Mobile App Development</h2>
              <p className="mb-4 flex-1" style={{ color: currentTheme.colors.card3.text }}>
                We create user-friendly mobile applications that enhance user experience and provide solutions tailored to your needs.
              </p>
              <BsArrowUpRightCircle className="self-end" style={{ color: currentTheme.colors.accent }} size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
