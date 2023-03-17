import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/blogs");
      setBlogs(response.data);
    } catch (error) {
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
