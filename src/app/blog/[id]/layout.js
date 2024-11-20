"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../../firebase';

const Layout = ({ children, params }) => {
  // Unwrap params to get the dynamic id
  const { id } = React.use(params);
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data for the current post to set dynamic meta tags and content
  useEffect(() => {
    if (!id) return;

    // Fetch the single post from Firebase
    const postRef = ref(db, `posts/${id}`);
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPost(data);
      } else {
        router.push('/404'); // Redirect to 404 if post not found
      }
      setLoading(false);
    });
  }, [id, router]);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (!post) return <div className="text-center py-12 text-red-600">Article not found.</div>;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={post.excerpt || "Default description of the site."} />
        <meta name="author" content="24XDEV" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || "Default description"} />
        <meta property="og:image" content={post.main_image} />
        <meta property="og:url" content={`https://24xdev.uk/news/${id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || "Default description"} />
        <meta name="twitter:image" content={post.main_image} />
      </Head>

      <main>{children}</main>
    </>
  );
};

export default Layout;
