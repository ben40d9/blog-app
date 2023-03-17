import React from "react";
import "./BlogPreview.css";

const BlogPreview = ({ title, content, id }) => {
  return (
    <a href={`/blog/${id}`} className="blog-preview">
      <div className="blog-preview-content">
        <h2 className="blog-title">{title}</h2>
        <p className="blog-excerpt">{content.substring(0, 100)}...</p>
      </div>
    </a>
  );
};

export default BlogPreview;
