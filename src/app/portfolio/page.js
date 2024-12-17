"use client"
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';

const Portfolio = () => {
  const [projects, setProjects] = useState([]); // All projects from Firebase
  const [displayedProjects, setDisplayedProjects] = useState([]); // Projects to display
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Flag to check if more projects are available
  const [currentIndex, setCurrentIndex] = useState(9); // Track the current index for pagination

  useEffect(() => {
    // Fetch portfolio data from Firebase Realtime Database
    const portfolioRef = ref(db, 'portfolio');
    
    onValue(portfolioRef, (snapshot) => {
      const data = snapshot.val();
      const projectsArray = data ? Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      })) : [];
      
      setProjects(projectsArray);
      setDisplayedProjects(projectsArray.slice(0, 9)); // Initially display the first 9 projects
      setLoading(false); // Stop loading once data is fetched
      setHasMore(projectsArray.length > 9); // Check if there are more projects to load
    });
  }, []);

  const handleShowMore = () => {
    const nextIndex = currentIndex + 9;
    const nextProjects = projects.slice(currentIndex, nextIndex);
    setDisplayedProjects((prev) => [...prev, ...nextProjects]);
    setCurrentIndex(nextIndex);

    if (nextIndex >= projects.length) {
      setHasMore(false); // No more projects to load
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">My Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project) => (
          <div key={project.id} className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
            <div
              className="bg-cover bg-center h-64"
              style={{ backgroundImage: `url(${project.imgSrc})` }}
            >
              <div className="bg-black bg-opacity-50 p-4 h-full flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-white">{project.description}</p>
              </div>
            </div>
            {/* Link to project detail page or other actions */}
            <a href={`/portfolio/${project.id}`} className="absolute inset-0 z-10"></a>
          </div>
        ))}
      </div>
      
      {/* Show More Button */}
      {hasMore && (
        <div className="text-center mt-6">
          <button 
            onClick={handleShowMore} 
            className="px-6 py-2 rounded-lg hover:bg-accent transition duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
