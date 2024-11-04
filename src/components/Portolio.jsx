import React from 'react';

const Portfolio = ({ currentTheme } ) => {

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
              className={`portfolio-item ${item.filter} transition-transform duration-300`}
              data-wow-delay={item.delay}
              role="tabpanel"
              aria-labelledby={`portfolio-item-${index}`}
            >
              <div className="relative rounded-lg overflow-hidden shadow-md">
                
                {/* Portfolio Image */}
                <img
                  src={item.imgSrc}
                  alt={item.alt}
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
                      href={item.imgSrc}
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

// Portfolio Items Data
const portfolioItems = [
  { title: 'App 1', category: 'App', imgSrc: 'img/portfolio/app1.jpg', alt: 'Screenshot of App 1', filter: 'filter-app', delay: '0s' },
  { title: 'Web 3', category: 'Web', imgSrc: 'img/portfolio/web3.jpg', alt: 'Screenshot of Web 3', filter: 'filter-web', delay: '0.1s' },
  { title: 'App 2', category: 'App', imgSrc: 'img/portfolio/app2.jpg', alt: 'Screenshot of App 2', filter: 'filter-app', delay: '0.2s' },
  { title: 'Card 2', category: 'Card', imgSrc: 'img/portfolio/card2.jpg', alt: 'Screenshot of Card 2', filter: 'filter-card', delay: '0s' },
  { title: 'Web 2', category: 'Web', imgSrc: 'img/portfolio/web2.jpg', alt: 'Screenshot of Web 2', filter: 'filter-web', delay: '0.1s' },
  { title: 'App 3', category: 'App', imgSrc: 'img/portfolio/app3.jpg', alt: 'Screenshot of App 3', filter: 'filter-app', delay: '0.2s' },
  { title: 'Card 1', category: 'Card', imgSrc: 'img/portfolio/card1.jpg', alt: 'Screenshot of Card 1', filter: 'filter-card', delay: '0s' },
  { title: 'Card 3', category: 'Card', imgSrc: 'img/portfolio/card3.jpg', alt: 'Screenshot of Card 3', filter: 'filter-card', delay: '0.1s' },
  { title: 'Web 1', category: 'Web', imgSrc: 'img/portfolio/web1.jpg', alt: 'Screenshot of Web 1', filter: 'filter-web', delay: '0.2s' },
];

export default Portfolio;
