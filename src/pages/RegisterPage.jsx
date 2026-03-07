import React, { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import { apiEndpoints, baseUrl, registerToken } from "@/constants/constants"
import { ROUTES } from "@/constants/routeConfig"
import { responseMessages } from "@/constants/messages"
import { GoogleLogin } from '@react-oauth/google'

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

      const response = await axios.post(apiEndpoints.signUp, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const { success, message, errors } = response.data;

      if (success) {
        toast.success(message || "Sign-up successful!");
        setEmail("");
        setUsername("");
        setPassword("");
        navigate("/login");
      } else {
        if (Array.isArray(errors)) {
          errors.forEach((err) => toast.error(err));
        } else {
          toast.error("Sign-up failed.");
        }
      }
    } catch (error) {
      console.error("Sign-up error:", error);

      if (error.response) {
        const data = error.response.data;
        if (data?.errors && Array.isArray(data.errors)) {
          data.errors.forEach((err) => toast.error(err));
        } else if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error(`Unexpected error: ${error.response.status}`);
        }

      } else if (error.request) {
        toast.error("No response received from server.");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header with Back Link */}
      <div className="mb-8">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
        >
          ← Back to Home
        </button>
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-foreground">Create account</h2>
          <p className="text-muted-foreground">Join DocuVault and secure your documents</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground font-medium">
              Username
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="pl-10 py-3 bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="pl-10 py-3 bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="pl-10 pr-10 py-3 bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" id="terms" className="mt-1" required />
            <label htmlFor="terms" className="text-muted-foreground">
              I agree to the{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn btn-primary py-3 text-base font-semibold"
          >
            Create account
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <div className="mt-4">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const idToken = credentialResponse.credential

              try {
                const response = await axios.post(`${baseUrl}/api/v1/Google/OAuth`, {
                  id_token: idToken,
                })

                const { success, token, user, message } = response.data

                if (success && token) {
                  toast.success(message || "Google sign-up successful!")

                  localStorage.setItem("authToken", token)
                  localStorage.setItem("currentUser", JSON.stringify(user))
                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

                  setTimeout(() => {
                    navigate(ROUTES.DASHBOARD)
                  }, 1000)
                } else {
                  toast.error("Google sign-up failed")
                }
              } catch (error) {
                toast.error("Google sign-up failed. Please try again.")
              }
            }}
            onError={() => {
              toast.error("Google sign-up failed.")
            }}
          />
        </div>

        {/* Sign In Link */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
};

export default RegisterPage;
