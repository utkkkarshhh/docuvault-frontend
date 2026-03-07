const responseMessages = {
  // Authentication Messages
  auth: {
    loginSuccess: "Login successful! Redirecting to dashboard...",
    loginError: "Failed to login. Please check your credentials and try again.",
    signupSuccess: "Account created successfully! Please sign in.",
    signupError: "Failed to create account. Please try again.",
    logoutSuccess: "Logged out successfully.",
    logoutError: "Failed to logout. Please try again.",
    invalidCredentials: "Invalid email or password.",
    emailAlreadyExists: "Email already registered. Please sign in or use a different email.",
    passwordResetSuccess: "Password reset successful! Please sign in with your new password.",
    passwordResetError: "Failed to reset password. Please try again.",
    otpSentSuccess: "OTP sent to your email/phone. Please verify.",
    otpVerificationSuccess: "OTP verified successfully.",
    otpVerificationError: "Invalid OTP. Please try again.",
    sessionExpired: "Your session has expired. Please sign in again.",
    unauthorizedAccess: "You don't have permission to access this resource.",
    authError: "Authentication failed. Please try again.",
  },

  // Document Messages
  document: {
    uploadSuccess: "Document uploaded successfully!",
    uploadError: "Failed to upload document. Please try again.",
    deleteSuccess: "Document deleted successfully.",
    deleteError: "Failed to delete document. Please try again.",
    downloadSuccess: "Document downloaded successfully.",
    downloadError: "Failed to download document. Please try again.",
    documentsNotFound: "No documents found.",
    documentNotFound: "Document not found.",
    invalidFileType: "Invalid file type. Please upload a supported format.",
    fileTooLarge: "File size exceeds the maximum limit.",
    documentsLoadError: "Failed to load documents. Please try again.",
  },

  // User Profile Messages
  user: {
    profileUpdateSuccess: "Profile updated successfully.",
    profileUpdateError: "Failed to update profile. Please try again.",
    passwordChangeSuccess: "Password changed successfully.",
    passwordChangeError: "Failed to change password. Please try again.",
    accountDeleteSuccess: "Account deleted successfully.",
    accountDeleteError: "Failed to delete account. Please try again.",
    detailsLoadError: "Failed to load user details. Please try again.",
    avatarUpdateSuccess: "Profile picture updated successfully.",
    avatarUpdateError: "Failed to update profile picture. Please try again.",
  },

  // Feed Messages
  feed: {
    postsLoadError: "Failed to load posts. Please try again.",
    postCreateSuccess: "Post created successfully!",
    postCreateError: "Failed to create post. Please try again.",
    postDeleteSuccess: "Post deleted successfully.",
    postDeleteError: "Failed to delete post. Please try again.",
    likeSuccess: "Post liked!",
    unlikeSuccess: "Like removed.",
    interactionError: "Failed to process interaction. Please try again.",
    noPostsAvailable: "No posts available yet.",
  },

  // General Messages
  general: {
    success: "Operation completed successfully.",
    error: "An unexpected error occurred. Please try again.",
    loading: "Loading...",
    noResults: "No results found.",
    tryAgain: "Please try again.",
    somethingWentWrong: "Something went wrong. Please refresh the page and try again.",
    networkError: "Network error. Please check your connection and try again.",
    invalidInput: "Please provide valid input.",
    confirmAction: "Are you sure you want to proceed?",
    saved: "Saved successfully.",
    cancelled: "Operation cancelled.",
  },

  // Validation Messages
  validation: {
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    passwordRequired: "Password is required.",
    passwordTooShort: "Password must be at least 8 characters.",
    passwordStrength: "Password must contain uppercase, lowercase, number, and special character.",
    nameRequired: "Name is required.",
    fieldRequired: "This field is required.",
    confirmPasswordMismatch: "Passwords do not match.",
  },
}

export { responseMessages }
