import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import BlogPreview from "./components/BlogPreview";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import BlogList from "./components/BlogList";

// This is sample data. Replace it with data fetched from your API.
const blogData = [
  {
    id: 1,
    title: "Blog Title 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 2,
    title: "Blog Title 2",
    content: "Integer eget massa in magna semper volutpat...",
  },
  // Add more sample blog data here
];

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My Blog App</h1>
          <nav>
            <Link to="/register">Register</Link>
            <Link to="/create-blog">Create Blog</Link>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <div className="blog-list">
                {blogData.map((blog) => (
                  <BlogPreview
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    id={blog.id}
                  />
                ))}
              </div>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
