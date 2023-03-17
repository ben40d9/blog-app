import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Please log in to create a blog.");
      return;
    }
    if (title && content) {
      try {
        const response = await axios.post(
          "/blogs",
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccess(true);
      } catch (error) {
        setError("Error creating blog. Please try again.");
      }
    } else {
      setError("Please enter a valid title and content.");
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create Blog</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Blog created successfully!</div>
      )}
    </div>
  );
};

export default CreateBlog;
