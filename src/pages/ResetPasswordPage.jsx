import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Progress } from "../components/ui/progress"
import { Mail, ArrowLeft, Eye, EyeOff, Check } from "lucide-react"
import { Spinner } from "../components/ui/spinner"
import { AuthPageSkeleton } from "../components/skeletons/AuthPageSkeleton"
import { requestOtp, verifyOTP, resetPassword } from "@/actions/authActions"
import { parseApiError } from "@/utils/parseApiError"

const ResetPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [identifier, setIdentifier] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [canResendOtp, setCanResendOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [pageLoading, setPageLoading] = useState(true)
  const [resetToken, setResetToken] = useState(null)
  const [expiresIn, setExpiresIn] = useState(null)
  const navigate = useNavigate()

  const progressValue = (currentStep / 3) * 100

  useEffect(() => {
    if (currentStep === 2 && !canResendOtp) {
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

      return () => clearInterval(timer)
    }
  }, [currentStep, canResendOtp])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleStep1Submit = async (e) => {
    e.preventDefault()

    if (!identifier.trim()) {
      toast.error("Please enter your username or email")
      return
    }

    setLoading(true)

    try {
      const data = await requestOtp(identifier.trim())

      toast.success(data.message || "OTP sent to your email successfully")

      setCurrentStep(2)
      setCanResendOtp(false)
      setResendTimer(30)
    } catch (error) {
      const parsedError = parseApiError(error)
      toast.error(parsedError)
    } finally {
      setLoading(false)
    }
  }

  const handleStep2Submit = async (e) => {
    e.preventDefault()

    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)

    try {
      const payload = {
        identifier: identifier.trim(),
        otp: otp.trim(),
        otp_type: "password_reset", // or dynamically set based on use-case
      }

      const data = await verifyOTP(payload)

      toast.success(data.message || "OTP verified successfully")

      // Store reset token in state to use in the next step
      setResetToken(data.data.reset_token)
      setExpiresIn(data.data.expires_in) // Optional: for countdown timer
      setCurrentStep(3)
    } catch (error) {
      const parsedError = parseApiError(error)
      toast.error(parsedError)
    } finally {
      setLoading(false)
    }
  }

  const handleStep3Submit = async (e) => {
    e.preventDefault()

    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in all password fields")
      return
    }

    setLoading(true)

    try {
      const payload = {
        reset_password_token: resetToken,
        new_password: newPassword.trim(),
        confirm_new_password: confirmPassword.trim(),
      }

      const data = await resetPassword(payload)

      toast.success(data.message || "Password reset successfully! You can now login.")

      navigate("/login")
    } catch (error) {
      const parsedError = parseApiError(error)
      toast.error(parsedError)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (!canResendOtp) return

    setLoading(true)

    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("OTP resent successfully")

      setCanResendOtp(false)
      setResendTimer(30)
    } catch (error) {
      toast.error("Failed to resend OTP")
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    } else {
      navigate("/login")
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Reset Password"
      case 2:
        return "Verify OTP"
      case 3:
        return "Set New Password"
      default:
        return "Reset Password"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Enter your username or email address"
      case 2:
        return "Enter the 6-digit code sent to your email"
      case 3:
        return "Create a new secure password"
      default:
        return ""
    }
  }

  if (pageLoading) {
    return <AuthPageSkeleton />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <button onClick={goBack} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <h2 className="text-3xl font-extrabold text-gray-900">{getStepTitle()}</h2>
          <p className="mt-2 text-sm text-gray-600">{getStepDescription()}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round(progressValue)}%</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between text-xs text-gray-400">
            <span className={currentStep >= 1 ? "text-blue-600" : ""}>Email</span>
            <span className={currentStep >= 2 ? "text-blue-600" : ""}>Verify</span>
            <span className={currentStep >= 3 ? "text-blue-600" : ""}>Password</span>
          </div>
        </div>

        {/* Step 1: Enter Email/Username */}
        {currentStep === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <Label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                Username or Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your username or email"
                  className="pl-10"
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {currentStep === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div>
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
                className="text-center text-2xl tracking-widest"
                disabled={loading}
                maxLength={6}
                required
              />
            </div>

            <div className="text-center">
              {canResendOtp ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium flex items-center justify-center mx-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="mr-1" />
                      Resending...
                    </>
                  ) : (
                    "Resend OTP"
                  )}
                </button>
              ) : (
                <p className="text-sm text-gray-500">Resend OTP in {resendTimer} seconds</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        )}

        {/* Step 3: Set New Password */}
        {currentStep === 3 && (
          <form onSubmit={handleStep3Submit} className="space-y-6">
            <div>
              <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="pr-10"
                  disabled={loading}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="pr-10"
                  disabled={loading}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center">
                <Check className={`h-3 w-3 mr-1 ${newPassword.length >= 8 ? "text-green-500" : "text-gray-300"}`} />
                At least 8 characters
              </div>
              <div className="flex items-center">
                <Check
                  className={`h-3 w-3 mr-1 ${
                    newPassword === confirmPassword && newPassword.length > 0 ? "text-green-500" : "text-gray-300"
                  }`}
                />
                Passwords match
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || newPassword !== confirmPassword || newPassword.length < 8}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )}

        {/* Footer */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
