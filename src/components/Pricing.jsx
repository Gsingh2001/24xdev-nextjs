import Link from 'next/link';
import React from 'react';

const Pricing = ( { currentTheme }) => {

  return (
    <section
      id="pricing"
      className="py-10"
      style={{ backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text }}
      aria-labelledby="pricing-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <header className="text-center mb-8">
          <h3 id="pricing-heading" className="text-3xl font-bold" style={{ color: currentTheme.colors.primary }}>
            Pricing Plans
          </h3>
          <p className="mt-4" style={{ color: currentTheme.colors.secondary }}>
            Our flexible pricing plans are tailored to meet your needs, whether you&rsquo;re looking for basic web solutions or a comprehensive all-in-one package. We provide services for clients in India, the UK, and Canada.
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} currentTheme={currentTheme} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ price, period, title, features, currentTheme }) => {
  const isDarkMode = currentTheme.colors.text === '#F7FAFC'; // Check if dark mode is active

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 ${
        isDarkMode ? 'shadow-md hover:shadow-lg' : 'shadow-lg hover:shadow-xl'
      }`}
      role="article"
      aria-label={`${title} - ${price} per ${period}`}
      style={{
        background: isDarkMode ? currentTheme.colors.card1.background : '#ffffff', // Use the theme color for dark mode
        border: isDarkMode ? '1px solid #444' : '1px solid #ddd', // Border for cards
      }}
    >
      <div className="p-4">
        <h3 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
          <span className="currency">₹</span>
          {price}
          <span className="period">/{period}</span>
        </h3>
      </div>
      <div className="p-4" style={{ backgroundColor: isDarkMode ? '#2b2b2b' : '#ffffff' }}>
        <h4 className="text-xl font-semibold" style={{ color: currentTheme.colors.text }}>
          {title}
        </h4>
        
        {/* Feature List */}
        <ul className="list-disc list-inside mt-2" style={{ color: currentTheme.colors.text }}>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        {/* Call to Action Button */}
        <Link
          href="/gettingstarted"
          className={`mt-4 inline-block px-4 py-2 rounded text-center ${
            isDarkMode ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'
          } text-white transition duration-200`}
          aria-label={`Choose ${title} Plan`}
        >
          Choose Plan
        </Link>
      </div>
    </div>
  );
};

const pricingPlans = [
  {
    price: 99,
    period: 'month',
    title: 'Basic Plan',
    features: [
      'Custom Website Design',
      'Responsive Layout',
      'Basic Hosting',
      'SEO Optimization',
      'Email Support',
    ],
  },
  {
    price: 199,
    period: 'month',
    title: 'Regular Plan',
    features: [
      'Everything in Basic Plan',
      'Advanced Web Development',
      'Managed Hosting',
      'CMS Integration',
      'Priority Email & Phone Support',
    ],
  },
  {
    price: 299,
    period: 'month',
    title: 'Premium Plan',
    features: [
      'Everything in Regular Plan',
      'Custom Web App Development',
      'Dedicated Cloud Hosting',
      'Ongoing Maintenance & Updates',
      '24/7 Priority Support',
    ],
  },
];

export default Pricing;
