"use client";
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../firebase";
import { useTheme } from "@/app/assets/ThemeContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const Portfolio = () => {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const itemsPerPage = 9;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const portfolioRef = ref(db, "portfolio");
    onValue(portfolioRef, (snapshot) => {
      const data = snapshot.val();
      const projectsArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      
      setProjects(projectsArray);
      setFilteredProjects(projectsArray);
      setCategories(["all", ...new Set(projectsArray.map((p) => p.category))]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (selectedCategory !== "all") {
      filtered = projects.filter((project) => project.category === selectedCategory);
    }
    setFilteredProjects(filtered);
  }, [selectedCategory, projects]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    router.push("/portfolio?page=1"); // Reset to first page
  };

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    router.push(`/portfolio?page=${page}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: currentTheme.colors.background, color: currentTheme.colors.text }} className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center" style={{ color: currentTheme.colors.primary }}>My Portfolio</h1>
      
      {/* Category Filter */}
      <div className="flex justify-center gap-4 my-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-md ${selectedCategory === category ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedProjects.map((project) => (
          <div key={project.id} className="border p-4 rounded-lg shadow">
            <Link href={`/portfolio/${project.id}`}>
              <Image className="w-full h-56 object-cover rounded" src={project.imgSrc} alt={project.title} />
              <h3 className="text-lg font-bold mt-2">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.category}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;