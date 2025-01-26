import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/redux/user/userSlice";
import { login } from "@/redux/auth/authSlice";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const payload = {
      identifier: identifier.trim(),
      password: password.trim(),
    };

    try {
      if (!baseUrl) {
        throw new Error("Base URL is not defined");
      }

      dispatch(signInStart());

      const response = await axios.post(`${baseUrl}/api/auth/signin`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.token) {
        const { token, user } = response.data;
        toast.promise(Promise.resolve(), {
          loading: "Logging in...",
          success: "Login successful!",
          error: "Login failed",
        });

        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUser", JSON.stringify(user));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        dispatch(signInSuccess({ user }));
        dispatch(login(user));

        setIdentifier("");
        setPassword("");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        dispatch(signInFailure("Invalid response from server"));
        toast.error("Invalid response from server");
      }
    } catch (error) {
      const err =
        error.response?.data?.message || error.message || "An error occurred";

      dispatch(signInFailure(err));

      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];

      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 400:
            toast.error("Invalid credentials");
            break;
          case 401:
            toast.error("Invalid username or password");
            break;
          case 403:
            toast.error("Account locked. Please contact support");
            break;
          case 404:
            toast.error("Login service not available");
            break;
          case 500:
            toast.error("Server error. Please try again later");
            break;
          default:
            toast.error(err);
        }
      } else if (error.request) {
        toast.error("Cannot reach server. Please check your connection.");
      } else {
        toast.error("Login failed. Please try again.");
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
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="identifier" className="sr-only">
                Username or Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Username or email address"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={loading}
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
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
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
              disabled={loading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
