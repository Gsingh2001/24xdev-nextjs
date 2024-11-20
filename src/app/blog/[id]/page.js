"use client";
import React, { useEffect, useState, Suspense } from 'react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../../firebase';
import { useTheme } from '@/app/assets/ThemeContext';

// Dynamically import components
const RelatedBlogs = React.lazy(() => import('@/components/blogs/RelatedBlogs'));
const ShareButton = React.lazy(() => import('@/components/ShareButton'));
const LikeButton = React.lazy(() => import('@/components/LikeButton'));

const SingleNews = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme(); // Access the current theme
  const [category, setCategory] = useState(null); // Set category as null initially

  const { id } = React.use(params); // Use React.use to unwrap params
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    // Fetch the single post from Firebase
    const postRef = ref(db, `posts/${id}`);
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPost(data);
        // Store the data in sessionStorage
        sessionStorage.setItem('postTitle', data.title);
        sessionStorage.setItem('postDescription', data.description || limitWords(data.content?.join(' '), 20));
        sessionStorage.setItem('postImage', data.main_image);
        sessionStorage.setItem('postDate', data.date);
        sessionStorage.setItem('postCategory', data.category);

        // Fetch related posts by category
        if (data.category) {
          setCategory(data.category); // Set the category for related posts
        }
      } else {
        router.push('/404'); // Redirect to 404 if post not found
      }
      setLoading(false);
    });
  }, [id, router]);

  const limitWords = (text, limit) => {
    const plainText = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    return plainText.split(' ').slice(0, limit).join(' ') + (plainText.split(' ').length > limit ? '...' : '');
  };

  // Use sessionStorage to update meta tags when the component mounts
  useEffect(() => {
    const title = sessionStorage.getItem('postTitle');
    const description = sessionStorage.getItem('postDescription');
    const image = sessionStorage.getItem('postImage');
    const date = sessionStorage.getItem('postDate');
    const category = sessionStorage.getItem('postCategory');

    // Set meta tags
    if (title && description && image) {
      document.title = title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = description;
      } else {
        const metaTag = document.createElement('meta');
        metaTag.name = 'description';
        metaTag.content = description;
        document.head.appendChild(metaTag);
      }

      // Open Graph meta tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.content = title;
      } else {
        const ogTitleTag = document.createElement('meta');
        ogTitleTag.setAttribute('property', 'og:title');
        ogTitleTag.content = title;
        document.head.appendChild(ogTitleTag);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.content = description;
      } else {
        const ogDescriptionTag = document.createElement('meta');
        ogDescriptionTag.setAttribute('property', 'og:description');
        ogDescriptionTag.content = description;
        document.head.appendChild(ogDescriptionTag);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.content = image;
      } else {
        const ogImageTag = document.createElement('meta');
        ogImageTag.setAttribute('property', 'og:image');
        ogImageTag.content = image;
        document.head.appendChild(ogImageTag);
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.content = window.location.href;
      } else {
        const ogUrlTag = document.createElement('meta');
        ogUrlTag.setAttribute('property', 'og:url');
        ogUrlTag.content = window.location.href;
        document.head.appendChild(ogUrlTag);
      }
    }
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (!post) return <div className="text-center py-12 text-red-600">Article not found.</div>;

  return (
    <div className="py-12" style={{ backgroundColor: currentTheme.colors.background }}>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Post Content */}
        <div className="lg:w-2/3 w-full">
          {/* Post Header */}
          <div className="relative group h-80 mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              src={post.main_image}
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
              <h1
                className="text-3xl md:text-4xl font-semibold text-white mb-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}
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
              <p
                key={index}
                className="mb-6"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Related Blogs and Advertisement */}
        <div className="lg:w-1/3 w-full space-y-8">
          {/* Related Blogs */}
          <Suspense fallback={<div>Loading Related Blogs...</div>}>
            <RelatedBlogs category={category} currentBlogId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
