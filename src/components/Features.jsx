import React, { useEffect, useState } from 'react';
import { BsArrowUpRightCircle } from 'react-icons/bs';
import { ref, onValue } from 'firebase/database'; // Firebase Realtime Database imports
import { db } from '../../firebase';
import Link from 'next/link';

const Features = ({ currentTheme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState([]); // State to hold fetched posts
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Trigger visibility on component mount
  useEffect(() => {
    setIsVisible(true);

    // Fetch data from Firebase Realtime Database
    const postsRef = ref(db, 'posts'); // Adjust the path to your posts in the database

    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedPosts = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];

      // Sort posts by date in descending order (if there's a date field in your data)
      fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

      setPosts(fetchedPosts);
      setLoading(false); // Set loading to false after fetching data
    });
  }, []);

  return (
    <section className="py-6 md:py-10" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto px-4">
        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row h-full space-y-6 md:space-y-0 md:space-x-4">
          
          <div
            className={`w-full md:w-1/2 flex flex-col transition-transform duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >

            <div 
              className="bg-cover bg-center rounded-lg shadow-lg flex-1 flex flex-col relative"
              style={{ backgroundImage: `url(${posts[0]?.main_image || '/img/pexels-designecologist-1779487.jpg'})` }}
            >

              <div className="bg-black bg-opacity-50 p-6 flex-1 flex flex-col justify-end">
              <Link href={`/blog/${posts[0]?.id}`}>

                <h2 className="text-2xl font-bold text-white mb-2">{posts[0]?.title || 'Default Title'}</h2>
                <p className="text-gray-200 mb-4">
                  {posts[0]?.description || 'Default description.'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Getting Started</span>
                  <BsArrowUpRightCircle className="text-white" size={24} />
                </div>
            </Link>

              </div>

            </div>

          </div>

          {/* Second Column with Two Cards (50% width split on large screens, stacked on smaller screens) */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col space-y-6 md:space-y-4">
            <Link
              href={`/blog/${posts[1]?.id}`} // Dynamic link to the post
              className={`p-6 rounded-lg shadow-lg flex-1 flex flex-col hover:shadow-xl transition-shadow duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{
                backgroundColor: currentTheme.colors.card1.background,
                color: currentTheme.colors.card1.text,
              }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.primary }}>
                {posts[1]?.title || 'Web Development'}
              </h2>
              <p className="mb-4 flex-1" style={{ color: currentTheme.colors.card1.text }}>
                {posts[1]?.description || 'We build responsive and scalable web applications tailored to your business needs.'}
              </p>
              <BsArrowUpRightCircle className="self-end" style={{ color: currentTheme.colors.primary }} size={24} />
            </Link>

            <Link
              href={`/blog/${posts[2]?.id}`} // Dynamic link to the post
              className={`p-6 rounded-lg shadow-lg flex-1 flex flex-col hover:shadow-xl transition-shadow duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{
                backgroundColor: currentTheme.colors.card2.background,
                color: currentTheme.colors.card2.text,
              }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.secondary }}>
                {posts[2]?.title || 'Digital Marketing'}
              </h2>
              <p className="mb-4 flex-1" style={{ color: currentTheme.colors.card2.text }}>
                {posts[2]?.description || 'Our digital marketing strategies are designed to enhance your online presence.'}
              </p>
              <BsArrowUpRightCircle className="self-end" style={{ color: currentTheme.colors.secondary }} size={24} />
            </Link>
          </div>

          {/* Third Column with One Card (25% width on large screens) */}
          <div className={`w-full lg:w-1/4 flex flex-col transition-transform duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Link
              href={`/blog/${posts[3]?.id}`} // Dynamic link to the post
              className={`p-6 rounded-lg shadow-lg flex-1 flex flex-col hover:shadow-xl transition-shadow duration-300`}
              style={{
                backgroundColor: currentTheme.colors.card3.background,
                color: currentTheme.colors.card3.text,
              }}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.accent }}>
                {posts[3]?.title || 'Mobile App Development'}
              </h2>
              <p className="mb-4 flex-1" style={{ color: currentTheme.colors.card3.text }}>
                {posts[3]?.description || 'We create user-friendly mobile applications that enhance user experience.'}
              </p>
              <BsArrowUpRightCircle className="self-end" style={{ color: currentTheme.colors.accent }} size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
