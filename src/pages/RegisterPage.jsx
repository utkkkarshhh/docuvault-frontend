import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        navigate("/login");
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us and start managing your documents securely
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="username" className="sr-only">
                Username
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FiEye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign up
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default RegisterPage;
