// CallToAction.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js

const CallToAction = ({ currentTheme }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Basic fade-in animation with CSS classes
  useEffect(() => {
    setIsVisible(true); // Trigger fade-in on component mount
  }, []);

  return (
    <section
      id="call-to-action"
      className={`py-10 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Section */}
          <div className="lg:w-9/12 text-center lg:text-left mb-6 lg:mb-0">
            <h3
              id="cta-heading"
              className="text-3xl font-bold"
              style={{ color: currentTheme.colors.primary }}
            >
              Transform Your Business Today
            </h3>
            <p
              className="mt-4 text-lg"
              style={{ color: currentTheme.colors.secondary }}
            >
              Ready to elevate your online presence? Whether you need a stunning website, reliable hosting, or comprehensive web solutions, we’re here to help. Our expert team provides custom web design, development, deployment, and ongoing maintenance to ensure your success. Let’s build something great together!
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="lg:w-3/12 text-center">
            
              <Link
               href="/gettingstarted"
                className="inline-block py-2 px-4 rounded transition duration-300"
                style={{
                  backgroundColor: currentTheme.colors.buttonBackground,
                  color: currentTheme.colors.buttonText,
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = currentTheme.colors.buttonHover}
                onMouseLeave={(e) => e.target.style.backgroundColor = currentTheme.colors.buttonBackground}
                aria-label="Get started with 24XDEV services"
              >
                Get Started Now
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
