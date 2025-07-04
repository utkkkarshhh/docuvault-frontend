import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { signInFailure, signInSuccess } from "@/redux/user/userSlice"
import { login } from "@/redux/auth/authSlice"
import { parseApiError } from "@/utils/parseApiError"
import { googleLogin } from "@/actions/authActions"

const GoogleSignInButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential

    try {
      const { success, token, user, message } = await googleLogin(idToken)

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
        const parsedError = parseApiError({ response: { data: { errors: [message || "Login failed"] } } })
        toast.error(parsedError)
        dispatch(signInFailure(parsedError))
      }
    } catch (error) {
      const parsedError = parseApiError(error)
      toast.error(parsedError)
      dispatch(signInFailure(parsedError))
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        toast.error("Google sign-in failed.")
      }}
    />
  )
}

export default GoogleSignInButton
