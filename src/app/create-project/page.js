"use client"
import { useState } from "react";
import { db } from "../../../firebase";
import { ref, push, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    budget: "",
    duration: "",
    status: "",
    technologies: "",
    teamSize: "",
    client: "",
    githubLink: "",
    portfolioLink: "",
    projectLink: "",
    rating: "",
    content: "",
    challenges: "",
    solutions: "",
    futureEnhancements: "",
    teamMembers: [],
    tags: "",
    screenshots: [],
    imgSrc: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScreenshotChange = (index, field, value) => {
    const updatedScreenshots = [...formData.screenshots];
    updatedScreenshots[index] = { ...updatedScreenshots[index], [field]: value };
    setFormData({ ...formData, screenshots: updatedScreenshots });
  };

  const addScreenshotField = () => {
    setFormData({ ...formData, screenshots: [...formData.screenshots, { src: "", caption: "" }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProjectRef = push(ref(db, "portfolio"));
      await set(newProjectRef, {
        ...formData,
        date: new Date().toISOString(),
      });

      toast.success("Project created successfully!");
      router.push("/portfolio");
    } catch (error) {
      toast.error("Error creating project");
      console.error("Error adding project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          key !== "screenshots" && (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
          )
        ))}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Screenshots</h3>
          {formData.screenshots.map((screenshot, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Screenshot URL"
                value={screenshot.src}
                onChange={(e) => handleScreenshotChange(index, "src", e.target.value)}
                className="w-full p-2 border rounded mb-1"
                required
              />
              <input
                type="text"
                placeholder="Caption"
                value={screenshot.caption}
                onChange={(e) => handleScreenshotChange(index, "caption", e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button type="button" onClick={addScreenshotField} className="text-blue-600 mt-2">+ Add Screenshot</button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
