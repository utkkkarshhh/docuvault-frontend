"use client"

import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "@/redux/user/userSlice"
import { login } from "@/redux/auth/authSlice"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { parseApiError } from "@/utils/parseApiError"
import { loginUser } from "@/actions/authActions"
import { ROUTES } from "@/constants/routeConfig"
import { responseMessages } from "@/constants/messages"
import GoogleSignInButton from "@/components/oauth/GoogleSignInButton"

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!identifier.trim() || !password.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    const payload = {
      identifier: identifier.trim(),
      password: password.trim(),
    }

    try {
      dispatch(signInStart())
      const { success, token, user, errors } = await loginUser(payload)

      if (success && token) {
        toast.success("Login Successful!")

        localStorage.setItem("authToken", token)
        localStorage.setItem("currentUser", JSON.stringify(user))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        dispatch(signInSuccess({ user }))
        dispatch(login(user))

        setIdentifier("")
        setPassword("")

        setTimeout(() => {
          navigate("/home")
        }, 1000)
      } else {
        dispatch(signInFailure(errors?.[0] || "Login failed"))
        if (Array.isArray(errors)) {
          errors.forEach((msg) => toast.error(msg))
        } else {
          toast.error("Login failed")
        }
      }
    } catch (error) {
      localStorage.removeItem("authToken")
      delete axios.defaults.headers.common["Authorization"]
      const parsedError = parseApiError(error)
      dispatch(signInFailure(parsedError))
      toast.error(parsedError)
    }
  }

  const handleForgotPassword = async (e) => {
    setTimeout(() => {
      navigate("/forget_password")
    }, 0)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
          <h2 className="text-4xl font-bold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to your DocuVault account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email/Username Field */}
          <div className="space-y-2">
            <Label htmlFor="identifier" className="text-foreground font-medium">
              Email or Username
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                className="pl-10 py-3 bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="Enter your email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <button
                type="button"
                onClick={() => handleForgotPassword()}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="pl-10 pr-10 py-3 bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn btn-primary py-3 text-base font-semibold"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
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
          <GoogleSignInButton />
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to={ROUTES.REGISTER} className="font-medium text-primary hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
