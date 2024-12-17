import React from 'react';
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
    lightBgColor: '#f8f3fa',
    darkBgColor: '#3a2c3f',
    lightTextColor: '#333333',
    darkTextColor: '#f0e4f5',
    lightIconColor: '#ff689b',
    darkIconColor: '#ff8fa1',
  },
  {
    id: 2,
    title: "Quality Assurance",
    description: "We prioritize quality in every project, adhering to best practices and standards to deliver high-performance websites that stand out.",
    icon: AiOutlineStar,
    lightBgColor: '#fff7e6',
    darkBgColor: '#4a3b1e',
    lightTextColor: '#333333',
    darkTextColor: '#faf5e4',
    lightIconColor: '#e98e06',
    darkIconColor: '#f2a629',
  },
  {
    id: 3,
    title: "Client-Centric Approach",
    description: "At 24XDEV, we value our clients’ needs and work closely with you to ensure your vision comes to life with personalized solutions.",
    icon: AiOutlineUser,
    lightBgColor: '#e6f5f5',
    darkBgColor: '#1c3b3b',
    lightTextColor: '#333333',
    darkTextColor: '#cce6e6',
    lightIconColor: '#3fcdc7',
    darkIconColor: '#5ad5cf',
  },
  {
    id: 4,
    title: "Affordable Pricing",
    description: "We offer competitive pricing without compromising on quality, providing you with the best value for your investment.",
    icon: AiOutlineDollar,
    lightBgColor: '#eaf5ea',
    darkBgColor: '#264426',
    lightTextColor: '#333333',
    darkTextColor: '#d9f7d6',
    lightIconColor: '#41cf2e',
    darkIconColor: '#59e03d',
  },
  {
    id: 5,
    title: "Ongoing Support",
    description: "Our relationship doesn’t end at launch. We provide ongoing support and maintenance to keep your website updated and secure.",
    icon: AiOutlineLike,
    lightBgColor: '#edf2fc',
    darkBgColor: '#1e2944',
    lightTextColor: '#333333',
    darkTextColor: '#c6d8f0',
    lightIconColor: '#4262f3',
    darkIconColor: '#5a7df3',
  },
  {
    id: 6,
    title: "Timely Delivery",
    description: "We understand the importance of deadlines. Our team is committed to delivering your projects on time without compromising quality.",
    icon: AiOutlineClockCircle,
    lightBgColor: '#efe4fd',
    darkBgColor: '#3a2f58',
    lightTextColor: '#333333',
    darkTextColor: '#d6c8f5',
    lightIconColor: '#8660fe',
    darkIconColor: '#a57cfb',
  },
];

const WhyChooseUs = ({ currentTheme }) => (
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
            className="flex flex-col justify-center items-center md:p-8 lg:p-14 border rounded-lg shadow-lg transition-transform duration-500 ease-out transform scale-100 opacity-100"
            style={{
              backgroundColor: currentTheme.isLightMode ? reason.lightBgColor : reason.darkBgColor,
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

export default WhyChooseUs;
