"use client";
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase';
import { useTheme } from "@/app/assets/ThemeContext";
import Link from 'next/link';

const Portfolio = () => {
  const { currentTheme } = useTheme(); // Access the current theme from the context
  const [projects, setProjects] = useState([]); // Store all portfolio projects from Firebase
  const [displayedProjects, setDisplayedProjects] = useState([]); // Projects to be displayed on screen
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more projects to load
  const [currentIndex, setCurrentIndex] = useState(9); // Index to manage pagination, starts with the first 9

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
      setDisplayedProjects(projectsArray.slice(0, 9)); // Display the first 9 projects initially
      setLoading(false); // Data fetching is complete
      setHasMore(projectsArray.length > 9); // Check if more projects exist
    });
  }, []);

  const handleShowMore = () => {
    const nextIndex = currentIndex + 9;
    const nextProjects = projects.slice(currentIndex, nextIndex);
    setDisplayedProjects((prev) => [...prev, ...nextProjects]);
    setCurrentIndex(nextIndex);

    if (nextIndex >= projects.length) {
      setHasMore(false); // Disable 'Show More' if no more projects are available
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-4" style={{ borderColor: currentTheme.colors.accent }}></div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text }} className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center" style={{ color: currentTheme.colors.primary }}>
        My Portfolio
      </h1>

      {/* Portfolio Category */}
      <div
        className="mt-8 py-8 shadow-lg rounded-lg"
        style={{ backgroundColor: currentTheme.colors.card1.background }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold mb-4 flex items-center"
            style={{ color: currentTheme.colors.text }}
          >
            <span
              className="h-6 border-l-4"
              style={{ borderColor: currentTheme.colors.primary }}
            ></span>
            Portfolio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayedProjects.map((project) => {
              const projectId = project.id;
              return (
                <div
                  key={projectId}
                  className="flex flex-col border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-md"
                  style={{
                    backgroundColor: currentTheme.colors.card1.background,
                    color: currentTheme.colors.card1.text,
                  }}
                >
                  {projectId ? (
                    <Link href={`/portfolio/${projectId}`}>
                      <img
                        className="w-full h-56 object-cover rounded-t-lg"
                        src={project.imgSrc}
                        alt={project.title}
                      />
                    </Link>
                  ) : (
                    <img
                      className="w-full h-56 object-cover rounded-t-lg"
                      src={project.imgSrc}
                      alt={project.title}
                    />
                  )}
                  <div className="p-4 flex-grow">
                    <h3
                      className="text-lg font-bold leading-tight mb-2"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {projectId ? (
                        <Link
                          href={`/portfolio/${projectId}`}
                          className="hover:text-red-600"
                          style={{ color: currentTheme.colors.text }}
                        >
                          {project.title}
                        </Link>
                      ) : (
                        <span style={{ color: currentTheme.colors.text }}>
                          {project.title}
                        </span>
                      )}
                    </h3>
                    <div
                      className="flex items-center text-sm"
                      style={{ color: currentTheme.colors.text }}
                    >
                      <span
                        className="inline-block h-3 border-l-2"
                        style={{ borderColor: currentTheme.colors.primary }}
                      ></span>
                      {project.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div className="text-center mt-10 rounded-full text-lg font-semibold hover:bg-primary transition duration-300">
          <button
            onClick={handleShowMore}
            className="px-8 py-3"
            style={{
              backgroundColor: currentTheme.colors.accent,
              color: currentTheme.colors.buttonText,
            }}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
