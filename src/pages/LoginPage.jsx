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
import { FiLock, FiMail, FiEye, FiEyeOff, FiX } from "react-icons/fi"
import { apiEndpoints, baseUrl } from "../constants/constants"
import { GoogleLogin } from "@react-oauth/google"
import { parseApiError } from "@/utils/parseApiError"

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [forgotIdentifier, setForgotIdentifier] = useState("")
  const [otp, setOtp] = useState("")
  const [isRequestingOtp, setIsRequestingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [canResendOtp, setCanResendOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)

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
      if (!baseUrl) {
        throw new Error("Base URL is not defined")
      }

      dispatch(signInStart())

      const response = await axios.post(apiEndpoints.signIn, payload, {
        headers: { "Content-Type": "application/json" },
      })

      const { success, token, user, errors } = response.data

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
      console.error("Login error:", error)

      localStorage.removeItem("authToken")
      delete axios.defaults.headers.common["Authorization"]

      if (error.response) {
        const data = error.response.data
        const serverErrors = data?.errors || [data?.message] || ["Login failed"]

        dispatch(signInFailure(serverErrors[0]))

        serverErrors.forEach((msg) => toast.error(msg))
      } else if (error.request) {
        toast.error("Cannot reach server. Please check your connection.")
      } else {
        toast.error("Login failed: " + error.message)
      }
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    if (!forgotIdentifier.trim()) {
      toast.error("Please enter your username or email")
      return
    }

    setIsRequestingOtp(true)

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/ForgetPassword`,
        {
          identifier: forgotIdentifier.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )

      const { success, message, errors } = response.data

      if (success) {
        toast.success(message || "OTP sent successfully")
        setShowForgotModal(false)
        setShowOtpModal(true)
        startResendTimer()
      } else {
        if (Array.isArray(errors)) {
          errors.forEach((msg) => toast.error(msg))
        } else {
          toast.error("Failed to send OTP")
        }
      }
    } catch (error) {
      console.error("Forgot password error:", error)

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((msg) => toast.error(msg))
      } else {
        toast.error("Failed to send OTP. Please try again.")
      }
    } finally {
      setIsRequestingOtp(false)
    }
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault()

    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifyingOtp(true)

    try {
      // You can implement OTP verification API call here
      // For now, just showing success message
      toast.success("OTP verified successfully! You can now reset your password.")

      // Close modals and reset states
      setShowOtpModal(false)
      resetForgotPasswordStates()

      // Navigate to password reset page or show password reset form
      // navigate("/reset-password");
    } catch (error) {
      console.error("OTP verification error:", error)
      toast.error("Invalid OTP. Please try again.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    if (!canResendOtp) return

    setIsRequestingOtp(true)

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/ForgetPassword`,
        {
          identifier: forgotIdentifier.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      )

      const { success, message, errors } = response.data

      if (success) {
        toast.success("OTP resent successfully")
        startResendTimer()
      } else {
        if (Array.isArray(errors)) {
          errors.forEach((msg) => toast.error(msg))
        }
      }
    } catch (error) {
      console.error("Resend OTP error:", error)
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((msg) => toast.error(msg))
      } else {
        toast.error("Failed to resend OTP")
      }
    } finally {
      setIsRequestingOtp(false)
    }
  }

  const startResendTimer = () => {
    setCanResendOtp(false)
    setResendTimer(30)

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResendOtp(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const resetForgotPasswordStates = () => {
    setForgotIdentifier("")
    setOtp("")
    setCanResendOtp(false)
    setResendTimer(30)
  }

  const closeForgotModal = () => {
    setShowForgotModal(false)
    resetForgotPasswordStates()
  }

  const closeOtpModal = () => {
    setShowOtpModal(false)
    resetForgotPasswordStates()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Sign in to your account</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="identifier" className="sr-only">
                  Username or Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                    <FiLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
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

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  Forgot your password?
                </button>
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
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const idToken = credentialResponse.credential

                  try {
                    const response = await axios.post(`${baseUrl}/api/v1/Google/OAuth`, {
                      id_token: idToken,
                    })

                    const { success, token, user, message } = response.data
                    console.log("Success block reached, message:", message)

                    if (success && token) {
                      toast.success(message || "Google Sign-in successful!")

                      localStorage.setItem("authToken", token)
                      localStorage.setItem("currentUser", JSON.stringify(user))
                      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

                      dispatch(signInSuccess({ user }))
                      dispatch(login(user))

                      setTimeout(() => {
                        navigate("/home")
                      }, 1000)
                    } else {
                      const parsedError = parseApiError(response)
                      toast.error(parsedError)
                      dispatch(signInFailure(parsedError))
                    }
                  } catch (error) {
                    const parsedError = parseApiError(error)
                    toast.error(parsedError)
                    dispatch(signInFailure(parsedError))
                  }
                }}
                onError={() => {
                  toast.error("Google sign-in failed.")
                }}
              />
            </div>
          </div>
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Forgot Password</h3>
              <button onClick={closeForgotModal} className="text-gray-400 hover:text-gray-600">
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Enter your username or email address and we'll send you an OTP to reset your password.
            </p>

            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <Label htmlFor="forgotIdentifier" className="block text-sm font-medium text-gray-700 mb-2">
                  Username or Email
                </Label>
                <Input
                  id="forgotIdentifier"
                  type="text"
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  placeholder="Enter your username or email"
                  className="w-full"
                  disabled={isRequestingOtp}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForgotModal}
                  className="flex-1"
                  disabled={isRequestingOtp}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isRequestingOtp}>
                  {isRequestingOtp ? "Sending..." : "Send OTP"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Enter OTP</h3>
              <button onClick={closeOtpModal} className="text-gray-400 hover:text-gray-600">
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              We've sent a 6-digit OTP to your email. Enter it below to verify your identity.
            </p>

            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <Label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                    setOtp(value)
                  }}
                  placeholder="000000"
                  className="w-full text-center text-2xl tracking-widest"
                  disabled={isVerifyingOtp}
                  maxLength={6}
                  required
                />
              </div>

              <div className="mb-4 text-center">
                {canResendOtp ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                    disabled={isRequestingOtp}
                  >
                    {isRequestingOtp ? "Resending..." : "Resend OTP"}
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">Resend OTP in {resendTimer} seconds</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeOtpModal}
                  className="flex-1"
                  disabled={isVerifyingOtp}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isVerifyingOtp || otp.length !== 6}>
                  {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
