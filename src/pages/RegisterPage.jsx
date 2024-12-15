import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register Now</h1>
            <p className="text-balance text-muted-foreground">
              Please create an account!
            </p>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@domain.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="text"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  placeholder="●●●●●●●●"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Signup with Google
              </Button>
            </div>
          </form>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
