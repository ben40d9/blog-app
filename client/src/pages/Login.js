import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (email && password) {
      try {
        const response = await axios.post("/auth/login", { email, password });
        localStorage.setItem("authToken", response.data.token);
        setSuccess(true);
      } catch (error) {
        setError("Error logging in. Please try again.");
      }
    } else {
      setError("Please enter a valid email and password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Login successful!</div>}
    </div>
  );
};

export default Login;
