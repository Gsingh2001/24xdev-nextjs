"use client";
import { useState, useEffect } from 'react';
import { ref as dbRef, set, push, onValue, get } from 'firebase/database';
import Select from 'react-select';
import { Puff } from 'react-loader-spinner';
import { db } from '../../../firebase'; // Firebase config
import PropTypes from 'prop-types'; // Import prop-types for validation

function AddBlogPage() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        category: [], // Store selected categories
        content: ['', ''], // Default with two content sections
        main_image: '',
        likesCount: 0, // Default likes count
        liked: false, // Default liked status
    });
    const [loading, setLoading] = useState(false);

    // Transform categories from database into options for Select component
    const transformCategories = (categories) => {
        return Object.entries(categories).map(([key, value]) => ({
            value: key,
            name: value.name,
            label: value.name
        }));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesRef = dbRef(db, 'categories');
            onValue(categoriesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const transformedCategories = transformCategories(data);
                    setCategories(transformedCategories);
                }
            });
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (selectedOptions) => {
        const selectedCategories = selectedOptions ? selectedOptions.map(option => option.name) : [];
        setFormData({ ...formData, category: selectedCategories });
    };

    const handleContentChange = (e, index) => {
        const updatedContent = [...formData.content];
        updatedContent[index] = e.target.value;
        setFormData({ ...formData, content: updatedContent });
    };

    const handleAddContent = () => {
        setFormData({ ...formData, content: [...formData.content, ''] });
    };

    const handleRemoveContent = (index) => {
        const updatedContent = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: updatedContent });
    };

    const handleAddContentAtIndex = (index) => {
        const newContent = [...formData.content];
        newContent.splice(index, 0, ''); // Insert at specific index
        setFormData({ ...formData, content: newContent });
    };

    // Generate blog ID based on title
    const generateBlogId = (title) => {
        return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); // Slugify title
    };

    // Check if the blog ID already exists
    const checkIfBlogExists = async (blogId) => {
        const blogRef = dbRef(db, `posts/${blogId}`);
        const snapshot = await get(blogRef);
        return snapshot.exists(); // Return true if the blog ID exists
    };

    const generateUniqueBlogId = async (title) => {
        let blogId = generateBlogId(title);
        let counter = 1;
        
        // Check if the blog ID already exists, if so, modify the ID
        while (await checkIfBlogExists(blogId)) {
            blogId = `${generateBlogId(title)}-${counter}`;
            counter++;
        }

        return blogId;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, date, category, content, main_image, likesCount, liked } = formData;

        try {
            setLoading(true);

            // Generate a unique blog ID based on the title
            const blogId = await generateUniqueBlogId(title);

            // Prepare data for blog post
            const blogPostData = {
                title,
                date,
                category,
                content,
                main_image,
                likesCount,
                liked,
            };

            const blogPostRef = dbRef(db, `posts/${blogId}`);
            await set(blogPostRef, blogPostData); // Save blog under the generated blogId

            // Reset form data
            setFormData({
                title: '',
                date: '',
                category: [],
                content: ['', ''],
                main_image: '',
                likesCount: 0,
                liked: false,
            });
        } catch (error) {
            console.error('Failed to add blog post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Add New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {loading ? (
                    <div className="flex justify-center">
                        <Puff color="#00BFFF" height={100} width={100} />
                    </div>
                ) : (
                    <>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
                            <div className="space-y-4">
                                <div className="form-group">
                                    <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-md"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                                        Content
                                    </label>
                                    {formData.content.map((section, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <textarea
                                                name={`content-${index}`}
                                                value={section}
                                                onChange={(e) => handleContentChange(e, index)}
                                                className="w-full p-3 border rounded-md"
                                                rows="5"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveContent(index)}
                                                className="bg-red-500 text-white p-2 rounded-md"
                                            >
                                                Remove
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleAddContentAtIndex(index)}
                                                className="bg-yellow-500 text-white p-2 rounded-md"
                                            >
                                                Add After
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAddContent}
                                    className="bg-green-500 text-white p-3 rounded-md hover:bg-green-700 transition"
                                >
                                    Add New Content Section
                                </button>

                                <div className="form-group">
                                    <label htmlFor="category" className="block text-lg font-medium text-gray-700">
                                        Category
                                    </label>
                                    <Select
                                        options={categories}
                                        isMulti
                                        onChange={handleCategoryChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="main_image" className="block text-lg font-medium text-gray-700">
                                        Main Image URL
                                    </label>
                                    <input
                                        type="text"
                                        name="main_image"
                                        id="main_image"
                                        value={formData.main_image}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-md"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

AddBlogPage.propTypes = {
    showToast: PropTypes.func.isRequired
};

export default AddBlogPage;
