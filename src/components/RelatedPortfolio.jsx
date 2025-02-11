import { useEffect, useState, useContext } from "react";
import { ref, get } from "firebase/database";
import Link from 'next/link';  // Use Next.js Link
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify'; // Import DOMPurify
import { db } from "../../firebase";
import { useTheme } from "@/app/assets/ThemeContext"; // Import the custom hook
import Image from "next/image";

const RelatedPortfolio = ({ category, currentBlogId }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { currentTheme } = useTheme(); // Access the current theme from context

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const articlesRef = ref(db, "portfolio");
        const snapshot = await get(articlesRef);

        if (snapshot.exists()) {
          const articles = snapshot.val();
          const related = Object.keys(articles)
            .filter((id) => {
              const articleCategory = articles[id].category;

              // Ensure category is an array before checking if it includes
              const categoryList = Array.isArray(category) ? category : [category];

              // Ensure the article matches the selected category and is not the current blog
              if (Array.isArray(articleCategory)) {
                return (
                  articleCategory.some((cat) => categoryList.includes(cat)) &&
                  id !== currentBlogId
                );
              }

              return articleCategory === category && id !== currentBlogId;
            })
            .map((id) => ({ id, ...articles[id] }));

          setRelatedBlogs(related);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };

    if (category && currentBlogId) {
      fetchRelatedBlogs();
    }
  }, [category, currentBlogId]);

  if (relatedBlogs.length === 0) {
    return (
      <div className={`text-gray-600 text-center mt-4 ${currentTheme.colors.text === '#F7FAFC' ? 'text-white' : ''}`}>
        No related project found.
      </div>
    );
  }

  const truncateByCharacters = (text, charLimit) => {
    return text.length > charLimit ? text.substring(0, charLimit) + "..." : text;
  };

  return (
    <div className={`shadow-md rounded-lg p-4 max-w-2xl mx-auto ${currentTheme.colors.background === '#2D3748' ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold ${currentTheme.colors.text === '#F7FAFC' ? 'text-white' : 'text-gray-800'} mb-4`}>
        Related Projects
      </h2>
      <ul className="space-y-4">
        {relatedBlogs.slice(0, 10).map((blog) => {
          const truncatedTitle = truncateByCharacters(blog.title, 15);
          const safeTitle = DOMPurify.sanitize(truncatedTitle); // Use DOMPurify to sanitize

          return (
            <li
              key={blog.id}
              className={`rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden ${currentTheme.colors.background === '#2D3748' ? 'bg-gray-700' : 'bg-white'}`}
            >
              <Link href={`/portfolio/${blog.id}`}>
                <div className="flex items-start p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <Image
                    src={blog.imgSrc || '/path/to/fallback-image.jpg'} // Fallback image
                    alt={safeTitle}
                    className="w-20 h-20 object-cover rounded-lg mr-3 transition-transform duration-200 transform hover:scale-105"
                  />
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${currentTheme.colors.text === '#F7FAFC' ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {safeTitle}
                    </h3>
                    <div className={`text-sm text-gray-500 flex flex-wrap items-center space-x-1 ${currentTheme.colors.text === '#F7FAFC' ? 'text-gray-400' : ''}`}>
                      {Array.isArray(blog.category) && blog.category[0] && (
                        <span className={`bg-gray-200 ${currentTheme.colors.text === '#F7FAFC' ? 'text-gray-300 bg-gray-600' : 'text-gray-600'} px-1 py-0.5 rounded`}>
                          {blog.category[0]} {/* Display first category */}
                        </span>
                      )}
                      <span>•</span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// PropTypes validation
RelatedPortfolio.propTypes = {
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  currentBlogId: PropTypes.string.isRequired,
};

export default RelatedPortfolio;
