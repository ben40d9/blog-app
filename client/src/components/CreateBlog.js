import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/blogs",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle the response, e.g., show a success message or redirect the user to the blog list
    } catch (error) {
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreateBlog}>Create</button>
    </div>
  );
};

export default CreateBlog;
