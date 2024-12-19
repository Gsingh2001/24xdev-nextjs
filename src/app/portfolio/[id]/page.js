"use client";
import React, { useEffect, useState, Suspense } from "react";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { db } from "../../../../firebase";
import { useTheme } from "@/app/assets/ThemeContext";
import Link from "next/link";

// Dynamically import components
const RelatedPortfolio = React.lazy(() => import("@/components/RelatedPortfolio"));
const ShareButton = React.lazy(() => import("@/components/ShareButton"));
const LikeButton = React.lazy(() => import("@/components/LikeButton"));

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] w-full h-full"
        onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when clicking inside the modal
      >
        <button
          className="absolute top-4 right-4 text-white text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <img
          src={imageSrc}
          alt="Large view"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

const SingleNews = ({ params }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();
  const [category, setCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  const { id } = React.use(params);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    // Fetch the single post from Firebase
    const postRef = ref(db, `portfolio/${id}`);
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPost(data);
        sessionStorage.setItem("postTitle", data.title);
        sessionStorage.setItem("postDescription", data.description || limitWords(data.content?.join(" "), 20));
        sessionStorage.setItem("postImage", data.main_image);
        sessionStorage.setItem("postDate", data.date);
        sessionStorage.setItem("postCategory", data.category);

        if (data.category) {
          setCategory(data.category);
        }
      } else {
        router.push("/404");
      }
      setLoading(false);
    });
  }, [id, router]);

  const limitWords = (text, limit) => {
    const plainText = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    return plainText.split(" ").slice(0, limit).join(" ") + (plainText.split(" ").length > limit ? "..." : "");
  };

  const openModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc('');
  };

  if (loading) return <div className="text-center py-12 text-lg">Loading...</div>;

  if (!post) return <div className="text-center py-12 text-red-600">Article not found.</div>;

  return (
    <div
      className="py-12"
      style={{
        background: `linear-gradient(180deg, ${currentTheme.colors.background} 50%, #f0f4fa 100%)`,
      }}
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="lg:w-2/3 w-full">
          {/* Post Header */}
          <div className="relative group h-[400px] rounded-xl overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
              src={post.imgSrc}
              alt={post.alt || post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}
              />
              <div className="flex items-center text-gray-300 text-sm">
                <div className="h-3 w-1 bg-red-600 mr-2"></div>
                {limitWords(post.category, 2)}
              </div>
              <div className="flex items-center space-x-4 mt-6">
                <span className="text-gray-400 text-sm">{new Date(post.date).toLocaleDateString()}</span>
                <Suspense fallback={<div>Loading...</div>}>
                  <ShareButton title={post.title} />
                  <LikeButton blogId={id} />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="mt-8 text-lg leading-relaxed space-y-8" style={{ color: currentTheme.colors.text }}>
            <div>
              <p className="text-lg font-medium">{post.shortDescription}</p>
              <p>Project Link :- <Link href={post?.projectLink} target="_blank" className="text-sm font-small  hover:underline">{post?.projectLink}</Link></p>
            </div>
            <p>{post.description}</p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
                <p><strong>Client:</strong> {post.client}</p>
                <p><strong>Budget:</strong> {post.budget}</p>
                <p><strong>Duration:</strong> {post.duration}</p>
                <p><strong>Team Size:</strong> {post.teamSize}</p>
                <p><strong>Status:</strong> {post.status}</p>
                <p><strong>Rating:</strong> {post.rating}</p>
                <p><strong>Technologies:</strong> {post.technologies?.join(", ")}</p>
                <p><strong>Tags:</strong> {post.tags?.join(", ")}</p>

                {/* Add Project Link */}
                {post.githubLink && (
                  <p>
                    <strong>Github Link:</strong>{" "}
                    <a
                      href={post.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {post.githubLink}
                    </a>
                  </p>
                )}
              </div>

              {/* Project Highlights */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                <ul className="list-disc pl-5">
                  {post.futureEnhancements?.map((enhancement, index) => (
                    <li key={index}>{enhancement}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-4">Challenges</h3>
                <ul className="list-disc pl-5">
                  {post.challenges?.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
              <blockquote className="italic ">"{post.clientTestimonial}"</blockquote>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Team Members</h3>
              <div className="grid grid-cols-2 gap-6">
                {post.teamMembers?.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6">Screenshots</h3>
              <div className="grid grid-cols-2 gap-6">
                {post.screenshots?.map((screenshot, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden shadow-md cursor-pointer" onClick={() => openModal(screenshot.src)}>
                    <img
                      src={screenshot.src}
                      alt={screenshot.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <p className="absolute bottom-2 left-2 text-white text-sm bg-black/60 px-2 py-1 rounded-lg">
                      {screenshot.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}


            {/* Challenges */}
            {/* <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Challenges</h3>
              <ul className="list-disc pl-5">
                {post.challenges?.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div> */}

            {/* Solutions */}
            {/* <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Solutions</h3>
              <ul className="list-disc pl-5">
                {post.solutions?.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div> */}

            {/* Future Enhancements */}
            {/* <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Future Enhancements</h3>
              <ul className="list-disc pl-5">
                {post.futureEnhancements?.map((enhancement, index) => (
                  <li key={index}>{enhancement}</li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3 w-full space-y-8">
          <Suspense fallback={<div>Loading Related Blogs...</div>}>
            <RelatedPortfolio category={category} currentBlogId={id} />
          </Suspense>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal isOpen={isModalOpen} imageSrc={modalImageSrc} onClose={closeModal} />
    </div>
  );
};

export default SingleNews;
