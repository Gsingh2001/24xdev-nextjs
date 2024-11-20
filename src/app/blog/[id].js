import React from "react";
import { ref, get } from "firebase/database"; // Import Firebase functions
import { db } from "../../../firebase"; // Adjust the path to your Firebase config
import DOMPurify from "dompurify";

const BlogPost = ({ post }) => {
  if (!post) {
    return (
      <div className="text-center py-10">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1
            className="text-4xl font-semibold mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.title),
            }}
          />
          <div className="text-gray-500 text-sm">
            Category: {post.category.join(", ")}
          </div>
        </div>
        <div
          className="prose lg:prose-lg"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content.join("<br><br>")),
          }}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const postRef = ref(db, `posts/${id}`);
  const snapshot = await get(postRef);
  const post = snapshot.exists() ? snapshot.val() : null;

  return {
    props: { post },
  };
}

export default BlogPost;
