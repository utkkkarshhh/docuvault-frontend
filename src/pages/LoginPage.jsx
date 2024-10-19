import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="signup-form" onSubmit={handleSignIn}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Email or Username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="●●●●●●●●"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
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

export default LoginPage;
