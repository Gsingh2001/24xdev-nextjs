"use client"
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';

const Portfolio = ({ currentTheme }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch portfolio data from Firebase Realtime Database
    const portfolioRef = ref(db, 'portfolio');
    
    onValue(portfolioRef, (snapshot) => {
      const data = snapshot.val();
      const itemsArray = data ? Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      })) : [];
      
      // Set the portfolio items (only the latest 9 items)
      setPortfolioItems(itemsArray.slice(0, 9)); // Slice to get only the first 9 items
      setLoading(false); // Stop loading once data is fetched
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="portfolio"
      className={`py-10 ${currentTheme.isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      style={{ backgroundColor: currentTheme.colors.background }} // Set background color from theme
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto px-8">

        {/* Portfolio Header */}
        <header className="text-center mb-8">
          <h3 id="portfolio-heading" className="text-3xl font-bold" style={{ color: currentTheme.colors.primary }}>
            Our Portfolio
          </h3>
        </header>

        {/* Portfolio Filters */}
        <div className="mb-6">
          <ul id="portfolio-filters" className="flex justify-center space-x-4" role="tablist" aria-label="Portfolio Categories">
            {['All', 'App', 'Card', 'Web'].map((filter, index) => (
              <li
                key={index}
                data-filter={`.filter-${filter.toLowerCase()}`}
                className={`cursor-pointer hover:text-blue-500 ${filter === 'All' ? 'filter-active' : ''}`}
                role="tab"
                aria-selected={filter === 'All' ? 'true' : 'false'}
                style={{ color: currentTheme.colors.secondary }} // Use secondary color for filters
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className={`portfolio-item ${item.category.toLowerCase()} transition-transform duration-300`}
              data-wow-delay={item.delay}
              role="tabpanel"
              aria-labelledby={`portfolio-item-${index}`}
            >
              <div className="relative rounded-lg overflow-hidden shadow-md">
                
                {/* Portfolio Image */}
                <img
                  src={item.imgSrc} // Use `imgSrc` field from Firebase data
                  alt={item.alt || item.title} // Use `alt` or fallback to `title`
                  className="img-fluid w-full h-64 object-cover"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <h4 id={`portfolio-item-${index}`} className="text-lg font-semibold" style={{ color: currentTheme.colors.accent }}>
                    {item.title}
                  </h4>
                  <p className="text-sm">{item.category}</p>
                  <div className="flex space-x-2 mt-2">
                    <a
                      href={item.image} // Link to preview image (or use a custom link)
                      data-lightbox="portfolio"
                      data-title={item.title}
                      className="text-white hover:text-blue-400"
                      title="Preview"
                      aria-label={`Preview of ${item.title}`}
                    >
                      <i className="ion ion-eye" aria-hidden="true"></i>
                    </a>
                    <a
                      href="#"
                      className="text-white hover:text-blue-400"
                      title="More Details"
                      aria-label={`More details on ${item.title}`}
                    >
                      <i className="ion ion-android-open" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
