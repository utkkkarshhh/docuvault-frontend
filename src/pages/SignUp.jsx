import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./SignUp.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerToken = import.meta.env.VITE_APP_REGISTER_TOKEN;
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      email,
      password,
      token: registerToken,
    };

    try {
      if (!baseUrl) {
        throw new Error("Base URL is not defined");
      }

      const response = await axios.post(`${baseUrl}/api/auth/signup`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        toast.success("Sign-up successful!");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      const err =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || "An error occurred";

      console.error("Error during sign up:", err);

      if (error.response) {
        const status = error.response.status;
        const errorMessage = err;

        switch (status) {
          case 400:
            toast.error(`${errorMessage}`); // Bad Request
            break;
          case 401:
            toast.error(`${errorMessage}`); // Unauthorized
            break;
          case 403:
            toast.error(`${errorMessage}`); // Forbidden
            break;
          case 404:
            toast.error(`${errorMessage}`); // Not Found
            break;
          case 500:
            toast.error(`${errorMessage}`); // Internal Server Error
            break;
          default:
            toast.error(`${errorMessage}`); // Other errors
        }
      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error setting up request: " + error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="signup-links">
        <Link to="/forgot-password" className="signup-link">
          Forgot Password?
        </Link>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignUp;
