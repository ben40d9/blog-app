import React, { useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // Perform blog creation API call
    const response = await fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Replace 'your-token' with the actual user's token obtained after successful login
        Authorization: "Bearer your-token",
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    if (response.status === 200) {
      console.log("Blog created:", data);
      // Redirect user to the blog page or show a success message
    } else {
      console.log("Blog creation error:", data);
      // Show an error message
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>
      <form onSubmit={handleCreateBlog}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
