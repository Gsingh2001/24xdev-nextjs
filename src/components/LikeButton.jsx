import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../firebase';
import { FaThumbsUp } from 'react-icons/fa'; // Import the thumbs up icon from react-icons

const LikeButton = ({ blogId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Fetch the current like status and count for the blog post
  useEffect(() => {
    const postRef = ref(db, `posts/${blogId}`);
    get(postRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLiked(data.liked || false);
        setLikesCount(data.likesCount || 0);
      }
    });
  }, [blogId]);

  // Handle like button click
  const handleLike = () => {
    const postRef = ref(db, `posts/${blogId}`);
    const newLikesCount = liked ? likesCount - 1 : likesCount + 1;

    update(postRef, {
      liked: !liked,
      likesCount: newLikesCount,
    }).then(() => {
      setLiked(!liked);
      setLikesCount(newLikesCount);
    });
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-2 ${
        liked ? 'text-blue-600' : 'text-gray-200'
      }`}
    >
      <FaThumbsUp className="text-lg" /> {/* Add the like icon */}
      <span>{liked ? 'Unlike' : 'Like'}</span>
      <span className="font-semibold">{likesCount}</span>
    </button>
  );
};

export default LikeButton;
