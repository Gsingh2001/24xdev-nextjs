import React from 'react';
import Link from 'next/link'; // Import Next.js Link component
import { useTheme } from '@/app/assets/ThemeContext';
import Image from 'next/image';

const AdditionalLayout = ({ category, posts, limitWords }) => {
  const { currentTheme } = useTheme(); // Access the current theme

  // Filter posts by category and limit to 3 posts
  const filteredPosts = posts.filter(post => post.category.includes(category.name)).slice(0, 3);

  return (
    <div
      className="mt-8 py-8 shadow-lg rounded-lg"
      style={{ backgroundColor: currentTheme.colors.card1.background }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl font-bold mb-1 flex items-center"
          style={{ color: currentTheme.colors.text }}
        >
          <span
            className="h-6 border-l-4"
            style={{ borderColor: currentTheme.colors.primary }}
          ></span>
          {category.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPosts.map((post) => {
            const postId = post.id; // Extract post ID for better readability
            return (
              <div
                key={postId}
                className="flex flex-col border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-md"
                style={{
                  backgroundColor: currentTheme.colors.card1.background,
                  color: currentTheme.colors.card1.text,
                }}
              >
                {postId ? (
                  <Link href={`/blog/${postId}`}>
                    <Image
                      className="w-full h-56 object-cover rounded-t-lg"
                      src={post.main_image}
                      alt={post.title}
                      width="2400" height="2000"
                    />
                  </Link>
                ) : (
                  <Image
                    className="w-full h-56 object-cover rounded-t-lg"
                    src={post.main_image}
                    alt={post.title}
                    width="2400" height="2000"
                  />
                )}
                <div className="p-4 flex-grow">
                  <h3
                    className="text-lg font-bold leading-tight mb-2"
                    style={{ color: currentTheme.colors.text }}
                  >
                    {postId ? (
                      <Link
                        href={`/blog/${postId}`}
                        className="hover:text-red-600"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {limitWords(post.title, 6)}
                      </Link>
                    ) : (
                      <span style={{ color: currentTheme.colors.text }}>
                        {limitWords(post.title, 6)}
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
                    {post.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdditionalLayout;
