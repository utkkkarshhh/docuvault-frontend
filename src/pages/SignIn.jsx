import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./SignIn.scss";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    console.log(`Base URL: ${baseUrl}`);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const payload = {
      identifier,
      password,
    };

    try {
      if (!baseUrl) {
        throw new Error("Base URL is not defined");
      }

      const response = await axios.post(`${baseUrl}/api/auth/signin`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Sign-in successful!");
        setIdentifier("");
        setPassword("");
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      const err =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error;
      console.error("Error during sign in:", err);
      if (err.response) {
        const status = err.response.status;
        const errorMessage = err.response.data?.message || "An error occurred";

        switch (status) {
          case 400:
            toast.error(`Bad Request: ${errorMessage}`);
            break;
          case 401:
            toast.error(`Unauthorized: ${errorMessage}`);
            break;
          case 403:
            toast.error(`Forbidden: ${errorMessage}`);
            break;
          case 404:
            toast.error(`Not Found: ${errorMessage}`);
            break;
          case 500:
            toast.error(`Internal Server Error: ${errorMessage}`);
            break;
          default:
            toast.error(`Error: ${errorMessage}`);
        }
      } else if (err.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error setting up request: " + err.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      <form className="signup-form" onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Email or Username"
          className="signup-input"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
          Sign In
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignIn;
