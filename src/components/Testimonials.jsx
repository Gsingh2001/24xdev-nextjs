// src/pages/Testimonials.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { useTheme } from '@/app/assets/ThemeContext';

const testimonials = [
  {
    name: "John Doe",
    location: "New York, USA",
    feedback: "24xDev exceeded our expectations with a clean, modern, and responsive website. Their team was incredibly professional and responsive to our needs.",
    rating: 5,
  },
  {
    name: "Emily Smith",
    location: "London, UK",
    feedback: "Their expertise in React and Firebase made our project seamless. Highly recommend 24xDev for anyone looking to build a high-quality web app!",
    rating: 5,
  },
  {
    name: "Ravi Kumar",
    location: "Mumbai, India",
    feedback: "Excellent work! They delivered a custom CMS for our blog with all the features we needed. Great communication and fast delivery.",
    rating: 4,
  },
  {
    name: "Sarah Johnson",
    location: "San Francisco, USA",
    feedback: "I am thrilled with the final product! The team at 24xDev was very accommodating and delivered exactly what we envisioned for our e-commerce site.",
    rating: 5,
  },
  {
    name: "Amit Shah",
    location: "Bengaluru, India",
    feedback: "24xDev transformed our website, making it modern and fast. They implemented great designs and ensured it was SEO-optimized.",
    rating: 5,
  },
  {
    name: "David Brown",
    location: "Manchester, UK",
    feedback: "A wonderful experience! The team created a user-friendly interface and optimized our database, greatly improving our website's performance.",
    rating: 4,
  },
];

const Testimonials = () => {
  const { currentTheme, isDarkMode } = useTheme(); // Get the current theme

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500, // 1 second delay
    slidesToShow: 3, // Show 3 slides on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
        },
      },
      {
        breakpoint: 480, // You can adjust this breakpoint as needed
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
        },
      },
    ],
  };

  return (
    <div className={`p-8`} style={{ backgroundColor: currentTheme.colors.background }}>
      <h2 className={`text-3xl font-bold text-center mb-6`} style={{ color: currentTheme.colors.primary }}>
        What Our Clients Say
      </h2>
      <Slider {...settings} className="mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-all duration-300 ease-in-out`}
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s, transform 0.5s'
            }}
          >
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            <p className="text-sm">{testimonial.location}</p>
            <p className="my-4">{testimonial.feedback}</p>
            <p className="text-yellow-500 text-lg">
              {'★'.repeat(testimonial.rating)}
              {'☆'.repeat(5 - testimonial.rating)}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
