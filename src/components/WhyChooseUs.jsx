// WhyChooseUs.js
import React, { useEffect, useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineStar,
  AiOutlineUser,
  AiOutlineDollar,
  AiOutlineLike,
  AiOutlineClockCircle,
} from 'react-icons/ai';

const reasonsData = [
  {
    id: 1,
    title: "Expertise and Experience",
    description: "Our team comprises industry experts with years of experience in web design, development, and digital solutions, ensuring top-notch service.",
    icon: AiOutlineCheckCircle,
    lightBgColor: '#f8f3fa', // Light pink background
    darkBgColor: '#3a2c3f',  // Deep purple-gray background
    lightTextColor: '#333333', // Dark text for readability on light background
    darkTextColor: '#f0e4f5', // Light text for readability on dark background
    lightIconColor: '#ff689b', // Vibrant pink icon color
    darkIconColor: '#ff8fa1',  // Soft coral pink for dark mode
  },
  {
    id: 2,
    title: "Quality Assurance",
    description: "We prioritize quality in every project, adhering to best practices and standards to deliver high-performance websites that stand out.",
    icon: AiOutlineStar,
    lightBgColor: '#fff7e6', // Light yellow background
    darkBgColor: '#4a3b1e',  // Deep warm brown background
    lightTextColor: '#333333', // Dark text
    darkTextColor: '#faf5e4', // Light text
    lightIconColor: '#e98e06', // Orange icon
    darkIconColor: '#f2a629',  // Soft amber for dark mode
  },
  {
    id: 3,
    title: "Client-Centric Approach",
    description: "At 24XDEV, we value our clients’ needs and work closely with you to ensure your vision comes to life with personalized solutions.",
    icon: AiOutlineUser,
    lightBgColor: '#e6f5f5', // Soft pastel teal background
    darkBgColor: '#1c3b3b',  // Dark teal background
    lightTextColor: '#333333', // Dark text
    darkTextColor: '#cce6e6', // Light teal text for dark mode
    lightIconColor: '#3fcdc7', // Teal icon
    darkIconColor: '#5ad5cf',  // Soft aqua for dark mode
  },
  {
    id: 4,
    title: "Affordable Pricing",
    description: "We offer competitive pricing without compromising on quality, providing you with the best value for your investment.",
    icon: AiOutlineDollar,
    lightBgColor: '#eaf5ea', // Light green background
    darkBgColor: '#264426',  // Dark green background
    lightTextColor: '#333333', // Dark text
    darkTextColor: '#d9f7d6', // Light green text for dark mode
    lightIconColor: '#41cf2e', // Green icon
    darkIconColor: '#59e03d',  // Soft lime for dark mode
  },
  {
    id: 5,
    title: "Ongoing Support",
    description: "Our relationship doesn’t end at launch. We provide ongoing support and maintenance to keep your website updated and secure.",
    icon: AiOutlineLike,
    lightBgColor: '#edf2fc', // Light pastel blue background
    darkBgColor: '#1e2944',  // Navy blue background
    lightTextColor: '#333333', // Dark text
    darkTextColor: '#c6d8f0', // Light blue text for dark mode
    lightIconColor: '#4262f3', // Blue icon
    darkIconColor: '#5a7df3',  // Soft blue for dark mode
  },
  {
    id: 6,
    title: "Timely Delivery",
    description: "We understand the importance of deadlines. Our team is committed to delivering your projects on time without compromising quality.",
    icon: AiOutlineClockCircle,
    lightBgColor: '#efe4fd', // Light purple background
    darkBgColor: '#3a2f58',  // Deep indigo background
    lightTextColor: '#333333', // Dark text
    darkTextColor: '#d6c8f5', // Light purple text for dark mode
    lightIconColor: '#8660fe', // Purple icon
    darkIconColor: '#a57cfb',  // Soft lavender for dark mode
  },
];

const WhyChooseUs = ({ currentTheme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('choose-us');
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="choose-us"
      className="py-8"
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: currentTheme.colors.primary }}>
            Why Choose Us
          </h2>
          <p className="mt-1 text-base leading-7" style={{ color: currentTheme.colors.secondary }}>
            Your trusted partner in web development solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-2 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-10">
          {reasonsData.map((reason, index) => (
            <div
              key={reason.id}
              className={`flex flex-col justify-center items-center md:p-8 lg:p-14 border rounded-lg shadow-lg transition-transform duration-500 ease-out ${
                isVisible ? 'transform scale-100 opacity-100' : 'transform scale-90 opacity-0'
              }`}
              style={{
                backgroundColor: currentTheme.isLightMode ? reason.lightBgColor : reason.darkBgColor,
                transitionDelay: `${index * 0.1}s`,
                borderColor: currentTheme.isLightMode ? '#ddd' : '#444',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex justify-center items-center"
                style={{
                  backgroundColor: currentTheme.isLightMode ? reason.lightBgColor : reason.darkBgColor,
                  color: currentTheme.isLightMode ? reason.lightIconColor : reason.darkIconColor,
                }}
              >
                {<reason.icon className="text-4xl" />}
              </div>
              <h3 className="mt-12 text-xl font-bold" style={{ color: currentTheme.isLightMode ? reason.lightTextColor : reason.darkTextColor }}>
                {reason.title}
              </h3>
              <p className="mt-5 text-base" style={{ color: currentTheme.isLightMode ? reason.lightTextColor : reason.darkTextColor }}>
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
