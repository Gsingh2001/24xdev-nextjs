import { useTheme } from '@/app/assets/ThemeContext';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const PostCarousel = ({ category, posts, limitWords }) => {
    const { currentTheme } = useTheme(); // Access the current theme

    return (
        <div
            className="relative bg-cover bg-center bg-fixed mt-10"
            style={{
                backgroundImage: "url('/img/bg.jpg')", // Ensure the path is correct
            }}
        >
            <div className="bg-black bg-opacity-70 py-12">
                <div className="container mx-auto px-8">
                    <h2 className="text-white text-3xl font-bold mb-4 flex items-center justify-center">
                        <span className="inline-block h-6 border-l-4 border-red-600 mr-3"></span>
                        {category.name}
                    </h2>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={3} // Show 3 slides on large screens
                        breakpoints={{
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {posts.map((post) => (
                            <SwiperSlide key={post.id} className="px-3">
                                <div 
                                    className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                                    style={{
                                        backgroundColor: currentTheme.colors.card1.background // Use the theme's card background
                                    }}
                                >
                                    {/* <Link href={post.link} className="block group"> */}
                                        <img
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            src={post.main_image}
                                            alt={post.title}
                                        />
                                    {/* </Link> */}
                                    <div className="p-4">
                                        <h3 
                                            className="text-lg font-bold mb-2 hover:text-red-600 transition duration-300"
                                            style={{
                                                color: currentTheme.colors.card1.text // Use the theme's text color
                                            }}
                                        >
                                            {/* <Link href={post.link}> */}
                                                {limitWords(post.title, 5)}
                                            {/* </Link> */}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {limitWords(post.description, 15)}
                                        </p>
                                        {/* <Link
                                            className="text-gray-500 text-sm hover:text-red-600 transition duration-300"
                                            href={post.categoryLink}
                                        > */}
                                            <span className="inline-block h-3 w-1 bg-red-600 mr-2"></span>
                                            {post.category[0]}
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default PostCarousel;
