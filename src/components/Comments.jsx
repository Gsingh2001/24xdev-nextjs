import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { useTheme } from '@/app/assets/ThemeContext'; // Import the theme context

const Comments = ({ blogId, title }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { currentTheme } = useTheme(); // Access the current theme

  // Fetch comments from Firebase
  useEffect(() => {
    const commentsRef = ref(db, `comments/${blogId}`);
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setComments(commentsArray);
      }
    });
  }, [blogId]);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const commentsRef = ref(db, `comments/${blogId}`);
      push(commentsRef, {
        text: newComment,
        timestamp: Date.now(),
      }).then(() => {
        setNewComment('');
      });
    }
  };

  return (
    <div className={`mt-8 ${currentTheme.colors.text === '#F7FAFC' ? 'text-white' : 'text-gray-900'}`}>
      <h2 className={`text-2xl font-semibold mb-4 ${currentTheme.colors.text === '#F7FAFC' ? 'text-white' : 'text-gray-800'}`}>
        Comments on {title}
      </h2>

      {/* Display existing comments */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-lg ${currentTheme.colors.card1.background} ${currentTheme.colors.card1.text}`}
          >
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      {/* Comment form */}
      <div className="mt-6">
        <textarea
          className={`w-full p-3 border rounded-md ${currentTheme.colors.background === '#2D3748' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border-${currentTheme.colors.border}`}
          rows="4"
          placeholder="Add your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          className={`mt-2 px-6 py-2 rounded-lg text-white ${currentTheme.colors.primary} ${currentTheme.colors.primaryHover}`}
          style={{
            backgroundColor: currentTheme.colors.primary,
            borderColor: currentTheme.colors.primary,
          }}
        >
          Submit Comment
        </button>

      </div>
    </div>
  );
};

export default Comments;
