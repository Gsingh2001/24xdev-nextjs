"use client"
import { useEffect, useState } from 'react';

const Layout = ({ children, postTitle, postDescription, postImage }) => {
    const [dynamicMetadata, setDynamicMetadata] = useState({
        title: 'Builder.io - Visual Headless CMS',
        description: 'Build digital experiences for any tech stack, visually.',
        image: postImage || 'default-image.jpg',
    });

    useEffect(() => {
        const storedTitle = sessionStorage.getItem('postTitle');
        const storedDescription = sessionStorage.getItem('postDescription');

        // Update metadata if values are found in sessionStorage
        if (storedTitle && storedDescription) {
            setDynamicMetadata({
                title: storedTitle,
                description: storedDescription,
                image: storedTitle.image || 'default-image.jpg',
            });
        } else {
            setDynamicMetadata({
                title: postTitle || dynamicMetadata.title,
                description: postDescription || dynamicMetadata.description,
                image: postImage || dynamicMetadata.image,
            });
        }
    }, [postTitle, postDescription, postImage]);

    // Update document head with dynamic metadata
    useEffect(() => {
        document.title = dynamicMetadata.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = dynamicMetadata.description;
        } else {
            const metaTag = document.createElement('meta');
            metaTag.name = 'description';
            metaTag.content = dynamicMetadata.description;
            document.head.appendChild(metaTag);
        }
    }, [dynamicMetadata]);

    const metadata = dynamicMetadata;

    return <>{children}</>;
};

export const getMetadata = () => dynamicMetadata;

export default Layout;
