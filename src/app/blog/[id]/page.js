"use client"
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../../firebase';
import { useTheme } from '@/app/assets/ThemeContext';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import remarkGfm from 'remark-gfm'; // GitHub-flavored markdown support
import Image from 'next/image';

// Dynamically import components
const RelatedBlogs = React.lazy(() => import('@/components/blogs/RelatedBlogs'));
const ShareButton = React.lazy(() => import('@/components/ShareButton'));
const LikeButton = React.lazy(() => import('@/components/LikeButton'));

const SingleNews = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null); // Store the category
  const { currentTheme } = useTheme(); // Access current theme

  const router = useRouter();
  const { id } = React.use(params);

  useEffect(() => {
    if (!id) return;

    // Fetch the single post from Firebase
    const postRef = ref(db, `posts/${id}`);
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPost(data);
        setCategory(data.category);

        // Store metadata for SEO & Open Graph
        sessionStorage.setItem('postTitle', data.title);
        sessionStorage.setItem('postDescription', data.description || limitWords(data.content?.join(' '), 20));
        sessionStorage.setItem('postImage', data.main_image);
        sessionStorage.setItem('postDate', data.date);
        sessionStorage.setItem('postCategory', data.category);
      } else {
        router.push('/404'); // Redirect if post not found
      }
      setLoading(false);
    });
  }, [id, router]);

  // Function to limit words
  const limitWords = (text, limit) => {
    if (!text) return "";
    const plainText = text.replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
    return plainText.split(' ').slice(0, limit).join(' ') + (plainText.split(' ').length > limit ? '...' : '');
  };

  // Use sessionStorage to update meta tags
  useEffect(() => {
    const title = sessionStorage.getItem('postTitle');
    const description = sessionStorage.getItem('postDescription');
    const image = sessionStorage.getItem('postImage');

    if (title && description && image) {
      document.title = title;
      updateMetaTag('description', description);
      updateMetaTag('og:title', title);
      updateMetaTag('og:description', description);
      updateMetaTag('og:image', image);
      updateMetaTag('og:url', window.location.href);
    }
  }, []);

  // Function to update meta tags
  const updateMetaTag = (property, content) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
    metaTag.setAttribute('property', property);
    metaTag.content = content;
    document.head.appendChild(metaTag);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (!post) return <div className="text-center py-12 text-red-600">Article not found.</div>;

  return (
    <div className="py-12" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">

        {/* Left Column - Main Post Content */}
        <div className="lg:w-2/3 w-full">
          {/* Post Header */}
          <div className="relative group h-80 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              src={post.main_image}
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
              <h1
                className="text-3xl md:text-4xl font-semibold text-white mb-4"
                dangerouslySetInnerHTML={{ __html: post.title }} // No need for sanitization
              />
              <div className="flex items-center text-gray-300 text-sm">
                <div className="h-3 w-1 bg-red-600 mr-2"></div>
                {limitWords(post.category, 2)}
              </div>
              {/* Share Button, Date, Like Button */}
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</span>
                <Suspense fallback={<div>Loading...</div>}>
                  <ShareButton title={post.title} />
                  <LikeButton blogId={id} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-lg leading-relaxed space-y-6" style={{ color: currentTheme.colors.text }}>
            {post.content?.map((paragraph, index) => (
              <div key={index}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {paragraph}
                </ReactMarkdown>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Related Blogs */}
        <div className="lg:w-1/3 w-full space-y-8">
          <Suspense fallback={<div>Loading Related Blogs...</div>}>
            <RelatedBlogs category={category} currentBlogId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
