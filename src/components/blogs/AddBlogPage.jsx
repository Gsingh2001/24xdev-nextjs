import { useState, useEffect } from 'react';
import { ref as dbRef, set, push, onValue } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Select from 'react-select';
import { Puff } from 'react-loader-spinner';
import { auth, database, storage } from '../../FirebaseData'; // Adjust path as needed
import { onAuthStateChanged } from 'firebase/auth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS
import { IoClose } from 'react-icons/io5'; // Import close icon
import PropTypes from 'prop-types'; // Import prop-types for validation
import { SketchPicker } from 'react-color'; // Import color picker
import Image from 'next/image';

function AddBlogPage({ showToast }) {
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [color, setColor] = useState('#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        category: [],
        content: [''],
        main_image: null, // Changed to handle a single file
        author_name: '',
        author_avatar: '',
        images: []
    });
    const [loading, setLoading] = useState(false);

    const transformCategories = (categories) => {
        return Object.entries(categories).map(([key, value]) => ({
            value: key,
            name: value.name,
            label: value.name
        }));
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'color', 'background', 'align', 'code-block', 'script'
    ];

    const handleColorChange = (color) => {
        setColor(color.hex);
        // Apply color to selected text in editor
        const quill = document.querySelector('.ql-editor').__quill;
        const range = quill.getSelection();
        if (range) {
            quill.format('color', color.hex);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                author_name: user.displayName || '',
                author_avatar: user.photoURL || ''
            }));
        }
    }, [user]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesRef = dbRef(database, 'categories');
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

    const handleContentChange = (index, value) => {
        const updatedContent = [...formData.content];
        updatedContent[index] = value;
        setFormData({ ...formData, content: updatedContent });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevFormData => ({ ...prevFormData, images: [...prevFormData.images, ...files] }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'main_image' && files.length > 0) {
            setFormData({ ...formData, main_image: files[0] });
        }
    };

    const addContentSection = () => {
        setFormData({ ...formData, content: [...formData.content, ''] });
    };

    const removeContentSection = (index) => {
        const updatedContent = formData.content.filter((_, i) => i !== index);
        setFormData({ ...formData, content: updatedContent });
    };

    const removeImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
    };

    const uploadImage = async (imageFile) => {
        const imageRef = storageRef(storage, `blogImages/${imageFile.name}_${Date.now()}`);
        await uploadBytes(imageRef, imageFile);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, date, category, content, main_image, author_name, author_avatar, images } = formData;

        try {
            setLoading(true);

            let mainImageUrl = '';
            const imageUrls = [];

            if (main_image) {
                mainImageUrl = await uploadImage(main_image);
            }

            if (images.length > 0) {
                for (const image of images) {
                    const imageUrl = await uploadImage(image);
                    imageUrls.push(imageUrl);
                }
            }

            const blogPostData = {
                title,
                date,
                category,
                content,
                author_name,
                author_avatar,
                main_image: mainImageUrl,
                images: imageUrls,
                uid: user?.uid || ''
            };

            const blogPostRef = push(dbRef(database, 'blogPosts'));
            await set(blogPostRef, blogPostData);
            showToast('success', 'Blog post added successfully!');

            setFormData({
                title: '',
                date: '',
                category: [],
                content: [''],
                main_image: null,
                author_name: user?.displayName || '',
                author_avatar: user?.photoURL || '',
                images: []
            });
        } catch {
            showToast('error', 'Failed to add blog post.');
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
                                    <div className="relative">
                                        <ReactQuill
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={(value) => setFormData({ ...formData, title: value })}
                                            modules={modules}
                                            formats={formats}
                                            className="mt-1"
                                            theme="snow"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowColorPicker(!showColorPicker)}
                                            style={{ position: 'absolute', top: 0, right: 0, padding: '5px' }}
                                        >
                                            <span style={{ backgroundColor: color, display: 'inline-block', width: '24px', height: '24px', borderRadius: '50%' }}></span>
                                        </button>
                                        {showColorPicker && (
                                            <div style={{ position: 'absolute', top: '40px', right: 0, zIndex: 2 }}>
                                                <SketchPicker color={color} onChange={handleColorChange} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date" className="block text-lg font-medium text-gray-700">
                                        Date
                                    </label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category" className="block text-lg font-medium text-gray-700">
                                        Category
                                    </label>
                                    <Select
                                        id="category"
                                        name="category"
                                        isMulti
                                        value={categories.filter(category => formData.category.includes(category.name))}
                                        onChange={handleCategoryChange}
                                        options={categories}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                                        Content
                                    </label>
                                    {formData.content.map((content, index) => (
                                        <div key={index} className="relative mt-1">
                                            <ReactQuill
                                                value={content}
                                                onChange={(value) => handleContentChange(index, value)}
                                                modules={modules}
                                                formats={formats}
                                                theme="snow"
                                                className="mb-2"
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeContentSection(index)}
                                                    className="absolute top-0 right-0 p-1 text-red-500"
                                                >
                                                    <IoClose size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addContentSection}
                                        className="mt-2 text-blue-500 hover:underline"
                                    >
                                        Add New Section
                                    </button>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="main_image" className="block text-lg font-medium text-gray-700">
                                        Main Image
                                    </label>
                                    <input
                                        id="main_image"
                                        name="main_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="images" className="block text-lg font-medium text-gray-700">
                                        Additional Images
                                    </label>
                                    <input
                                        id="images"
                                        name="images"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="mt-1"
                                    />
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <Image
                                                    src={URL.createObjectURL(image)}
                                                    alt={`preview-${index}`}
                                                    className="w-32 h-32 object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-0 right-0 p-1 text-red-500"
                                                >
                                                    <IoClose size={20} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Submit
                            </button>
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
