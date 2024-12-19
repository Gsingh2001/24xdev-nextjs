import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ref, onValue } from 'firebase/database';
import { useTheme } from '@/app/assets/ThemeContext';
import { db } from '../../firebase';

const Testimonials = () => {
  const { currentTheme, isDarkMode } = useTheme();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const testimonialsRef = ref(db, 'testimonial');
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      const testimonialsArray = data ? Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })) : [];
      setTestimonials(testimonialsArray);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
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
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`p-6 rounded-lg shadow-lg text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-all duration-300 ease-in-out`}
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'opacity 0.5s, transform 0.5s',
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
