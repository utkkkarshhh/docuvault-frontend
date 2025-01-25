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

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login Now</h1>
            <p className="text-balance text-muted-foreground">
              Please enter your details!
            </p>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Username/Email</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="name@domain.com or name"
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  disabled={loading}
                />
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
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full" disabled={loading}>
                Login with Google
              </Button>
            </div>
          </form>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="mt-4 text-center text-sm">
            Dont have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
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
