import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (email && password) {
      try {
        const response = await axios.post("/auth/register", {
          email,
          password,
        });
        localStorage.setItem("authToken", response.data.token);
        setSuccess(true);
      } catch (error) {
        setError("Error registering. Please try again.");
      }
    } else {
      setError("Please enter a valid email and password.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">Registration successful!</div>
      )}
    </div>
  );
};

export default Register;
