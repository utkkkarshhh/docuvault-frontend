# DocuVault - Complete API Documentation

## Overview
This document provides comprehensive details about all APIs implemented in the DocuVault project, including their endpoints, request/response formats, implementation status, and data structures.

---

## Project Structure

### Base URL
```
{BASE_URL}/api/v1
```

### Environment Variables
- `VITE_APP_BASE_URL` - Backend server base URL
- `VITE_APP_REGISTER_TOKEN` - Token for user registration

### Authentication
All authenticated endpoints require:
```
Authorization: Bearer {authToken}
Content-Type: application/json
```

---

## API Categories

### 1. Authentication APIs (6 endpoints)

#### 1.1 Sign Up
- **Status**: LIVE API
- **Method**: POST
- **Endpoint**: `/api/v1/SignUp`
- **File**: `src/actions/authActions.js` - Not directly exported, handled in pages
- **Implementation**: User registration with email/username and password
- **Request**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "string",
  "token": "jwt_token",
  "user": {
    "user_id": "string",
    "username": "string",
    "email": "string",
    "created_at": "timestamp"
  }
}
```
- **Error Messages**:
  - `messages.auth.signupError` - Registration failed
  - `messages.validation.emailInvalid` - Invalid email format
  - `messages.validation.passwordTooShort` - Password < 8 chars
  - `messages.auth.emailAlreadyExists` - Email already registered

---

#### 1.2 Sign In / Login
- **Status**: LIVE API
- **Method**: POST
- **Endpoint**: `/api/v1/SignIn`
- **File**: `src/actions/authActions.js`
- **Function**: `loginUser(payload)`
- **Implementation**: User login with credentials
- **Request**:
```json
{
  "identifier": "email_or_username",
  "password": "string"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "string",
  "token": "jwt_token",
  "user": {
    "user_id": "string",
    "username": "string",
    "email": "string",
    "avatar": "url",
    "subscription_tier": "free|pro|enterprise"
  }
}
```
- **Error Messages**:
  - `messages.auth.loginError` - Login failed
  - `messages.auth.invalidCredentials` - Wrong email/password
  - `messages.auth.sessionExpired` - Session expired
  - `messages.validation.fieldRequired` - Missing required fields

---

#### 1.3 Google OAuth Sign In
- **Status**: LIVE API
- **Method**: POST
- **Endpoint**: `/api/v1/Google/OAuth`
- **File**: `src/actions/authActions.js`
- **Function**: `googleLogin(idToken)`
- **Implementation**: OAuth authentication using Google ID token
- **Request**:
```json
{
  "id_token": "google_oauth_token"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "string",
  "token": "jwt_token",
  "user": {
    "user_id": "string",
    "username": "string",
    "email": "string",
    "avatar": "url"
  }
}
```
- **Error Messages**:
  - `messages.auth.loginError` - OAuth login failed
  - `messages.general.somethingWentWrong` - Unexpected error

---

#### 1.4 Request OTP (Forget Password)
- **Status**: LIVE API
- **Method**: POST
- **Endpoint**: `/api/v1/ForgetPassword`
- **File**: `src/actions/authActions.js`
- **Function**: `requestOtp(identifier)`
- **Implementation**: Request OTP for password reset via email/username
- **Request**:
```json
{
  "identifier": "email_or_username"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "OTP sent to your email",
  "otpId": "string"
}
```
- **Error Messages**:
  - `messages.auth.passwordResetError` - OTP request failed
  - `messages.validation.fieldRequired` - Missing identifier

---

#### 1.5 Verify OTP
- **Status**: LIVE API
- **Method**: POST
- **Endpoint**: `/api/v1/VerifyOTP`
- **File**: `src/actions/authActions.js`
- **Function**: `verifyOTP(payload)`
- **Implementation**: Verify OTP sent to user's email
- **Request**:
```json
{
  "otpId": "string",
  "otp": "6_digit_code"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "OTP verified successfully",
  "verificationToken": "string"
}
```
- **Error Messages**:
  - `messages.auth.otpVerificationError` - Invalid OTP
  - `messages.general.error` - Verification failed

---

#### 1.6 Reset Password
- **Status**: LIVE API
- **Method**: PATCH
- **Endpoint**: `/api/v1/ResetPassword`
- **File**: `src/actions/authActions.js`
- **Function**: `resetPassword(payload)`
- **Implementation**: Set new password after OTP verification
- **Request**:
```json
{
  "verificationToken": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Password reset successfully"
}
```
- **Error Messages**:
  - `messages.auth.passwordResetError` - Password reset failed
  - `messages.validation.passwordStrength` - Weak password
  - `messages.validation.confirmPasswordMismatch` - Passwords don't match

---

### 2. Document APIs (5 endpoints)

#### 2.1 Get All User Documents
- **Status**: LIVE API
- **Method**: GET
- **Endpoint**: `/api/v1/Documents/DocumentsList`
- **File**: `src/actions/documentActions.js`
- **Function**: `getAllUserDocuments()`
- **Authentication**: Required (Bearer token)
- **Implementation**: Fetch all documents uploaded by the current user
- **Request**: None (uses auth header)
- **Response**:
```json
{
  "success": boolean,
  "data": [
    {
      "document_id": "string",
      "name": "string",
      "description": "string",
      "file_type": "pdf|doc|docx|xls|xlsx|csv|jpeg|jpg|png|svg",
      "file_size": "number (bytes)",
      "category_id": "number",
      "category_name": "string",
      "upload_date": "timestamp",
      "last_modified": "timestamp",
      "download_count": "number",
      "status": "active|archived|deleted",
      "file_url": "string"
    }
  ]
}
```
- **Error Messages**:
  - `messages.document.documentsLoadError` - Failed to fetch documents
  - `messages.auth.unauthorizedAccess` - User not authenticated
  - `messages.auth.sessionExpired` - Token expired

---

#### 2.2 Upload Document
- **Status**: LIVE API
- **Method**: POST
- **Endpoint**: `/api/v1/Documents/UploadDocument`
- **File**: `src/actions/documentActions.js`
- **Function**: `uploadDocument(formData)`
- **Authentication**: Required (Bearer token)
- **Implementation**: Upload a new document with metadata
- **Content-Type**: `multipart/form-data`
- **Request**:
```
FormData:
- file: File (required, max 50MB)
- name: string (required)
- description: string (optional)
- category_id: number (required)
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Document uploaded successfully",
  "data": {
    "document_id": "string",
    "name": "string",
    "file_type": "string",
    "file_size": "number",
    "upload_date": "timestamp",
    "status": "active"
  }
}
```
- **Supported File Types**:
  - Documents: pdf, doc, docx, xls, xlsx, csv
  - Images: jpeg, jpg, png, svg
- **Error Messages**:
  - `messages.document.uploadError` - Upload failed
  - `messages.document.invalidFileType` - Unsupported file type
  - `messages.document.fileTooLarge` - File exceeds size limit
  - `messages.validation.fieldRequired` - Missing required field

---

#### 2.3 Delete Document
- **Status**: LIVE API
- **Method**: DELETE
- **Endpoint**: `/api/v1/Documents/DeleteDocument/{documentId}`
- **File**: `src/actions/documentActions.js`
- **Function**: `deleteDocument(documentId)`
- **Authentication**: Required (Bearer token)
- **Implementation**: Permanently delete a document
- **Request**: None (documentId in URL)
- **Response**:
```json
{
  "success": boolean,
  "message": "Document deleted successfully",
  "data": {
    "document_id": "string"
  }
}
```
- **Error Messages**:
  - `messages.document.deleteError` - Failed to delete document
  - `messages.document.documentNotFound` - Document not found
  - `messages.auth.unauthorizedAccess` - User not document owner

---

#### 2.4 Get Document Categories (CategoryMaster)
- **Status**: LIVE API
- **Method**: GET
- **Endpoint**: `/api/v1/Documents/CategoryMaster`
- **File**: `src/actions/documentActions.js`
- **Function**: `getDocumentCategories()`
- **Authentication**: Required (Bearer token)
- **Implementation**: Get all available document categories for dropdown
- **Request**: None
- **Response**:
```json
{
  "success": boolean,
  "data": [
    {
      "category_id": "number",
      "name": "string",
      "description": "string",
      "icon": "string"
    }
  ]
}
```
- **Example Categories**:
  - 1: Personal
  - 2: Work
  - 3: Financial
  - 4: Legal
  - 5: Medical
- **Error Messages**:
  - `messages.general.error` - Failed to load categories
  - `messages.auth.unauthorizedAccess` - Unauthorized

---

#### 2.5 Download Document
- **Status**: LIVE API
- **Method**: GET
- **Endpoint**: `/api/v1/Documents/DocumentsList/{documentId}/download`
- **File**: `src/actions/documentActions.js`
- **Function**: `downloadDocument(documentId)`
- **Authentication**: Required (Bearer token)
- **Implementation**: Download document file (returns blob)
- **Response Type**: Blob (binary file)
- **Response Headers**:
```
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="filename.ext"
```
- **Error Messages**:
  - `messages.document.downloadError` - Download failed
  - `messages.document.documentNotFound` - File not found

---

### 3. User APIs (5 endpoints)

#### 3.1 Get User Details
- **Status**: LIVE API
- **Method**: GET
- **Endpoint**: `/api/v1/User/Details`
- **File**: `src/actions/userActions.js`
- **Function**: `getUserDetails()`
- **Authentication**: Required (Bearer token)
- **Implementation**: Fetch current user's profile information
- **Request**: None
- **Response**:
```json
{
  "success": boolean,
  "data": {
    "user_id": "string",
    "username": "string",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "avatar": "url",
    "bio": "string",
    "subscription_tier": "free|pro|enterprise",
    "subscription_expiry": "timestamp",
    "total_documents": "number",
    "total_storage_used": "bytes",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```
- **Error Messages**:
  - `messages.user.detailsLoadError` - Failed to load user details
  - `messages.auth.unauthorizedAccess` - Unauthorized

---

#### 3.2 Update User Details
- **Status**: LIVE API
- **Method**: PATCH
- **Endpoint**: `/api/v1/User/Details/Update`
- **File**: `src/actions/userActions.js`
- **Function**: `updateUserDetails(payload)`
- **Authentication**: Required (Bearer token)
- **Implementation**: Update user profile information
- **Request**:
```json
{
  "first_name": "string (optional)",
  "last_name": "string (optional)",
  "bio": "string (optional)",
  "avatar": "string (optional, file or URL)"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Profile updated successfully",
  "data": {
    "user_id": "string",
    "first_name": "string",
    "last_name": "string",
    "bio": "string",
    "avatar": "url",
    "updated_at": "timestamp"
  }
}
```
- **Error Messages**:
  - `messages.user.profileUpdateError` - Update failed
  - `messages.validation.fieldRequired` - Missing field

---

#### 3.3 Update User Password
- **Status**: LIVE API
- **Method**: PATCH
- **Endpoint**: `/api/v1/User/Password/Update`
- **File**: `src/actions/userActions.js`
- **Function**: `updateUserPassword(payload)`
- **Authentication**: Required (Bearer token)
- **Implementation**: Change user's password
- **Request**:
```json
{
  "oldPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Password changed successfully"
}
```
- **Validation**:
  - Old password must match current password
  - New password must be >= 8 characters
  - New password must contain uppercase, lowercase, number, special char
  - New & confirm passwords must match
- **Error Messages**:
  - `messages.user.passwordChangeError` - Password change failed
  - `messages.validation.passwordStrength` - Password too weak
  - `messages.validation.confirmPasswordMismatch` - Passwords don't match

---

#### 3.4 Delete User Account
- **Status**: LIVE API
- **Method**: DELETE
- **Endpoint**: `/api/v1/User/Delete`
- **File**: `src/actions/userActions.js`
- **Function**: `deleteUserAccount(payload)`
- **Authentication**: Required (Bearer token)
- **Implementation**: Permanently delete user account (requires password confirmation)
- **Request**:
```json
{
  "password": "string"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Account deleted successfully"
}
```
- **Side Effects**:
  - All user documents are deleted
  - All user data is purged
  - Session is terminated
- **Error Messages**:
  - `messages.user.accountDeleteError` - Deletion failed
  - `messages.auth.invalidCredentials` - Wrong password

---

#### 3.5 Update User Avatar
- **Status**: LIVE API
- **Method**: PATCH
- **Endpoint**: `/api/v1/User/Details/Update`
- **File**: `src/actions/userActions.js`
- **Function**: `updateUserAvatar(formData)`
- **Authentication**: Required (Bearer token)
- **Content-Type**: `multipart/form-data`
- **Implementation**: Upload user profile picture
- **Request**:
```
FormData:
- avatar: File (required, max 5MB, jpg|png|jpeg|svg)
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Profile picture updated successfully",
  "data": {
    "avatar": "url",
    "updated_at": "timestamp"
  }
}
```
- **Error Messages**:
  - `messages.user.avatarUpdateError` - Upload failed
  - `messages.document.invalidFileType` - Invalid image format
  - `messages.document.fileTooLarge` - File too large

---

### 4. Feed APIs (6 endpoints) - MOCK APIS

#### 4.1 Get All Feed Posts
- **Status**: MOCK API
- **Method**: GET
- **Implementation**: `src/actions/feedActions.js` - `getAllFeedPosts()`
- **Mock Data Source**: `src/utils/mockData.js` - `MOCK_FEED_POSTS`
- **Simulated Delay**: 300ms
- **Response**:
```json
{
  "success": boolean,
  "data": [
    {
      "id": "number",
      "user_id": "string",
      "username": "string",
      "avatar": "url",
      "title": "string",
      "content": "string",
      "document_id": "string (optional)",
      "file_url": "string (optional)",
      "timestamp": "timestamp",
      "likes": "number",
      "comments": "number",
      "shares": "number"
    }
  ]
}
```
- **Note**: Replace with real API at `/api/v1/Feed/Posts` when backend available

---

#### 4.2 Create Feed Post
- **Status**: MOCK API
- **Method**: POST
- **Implementation**: `src/actions/feedActions.js` - `createFeedPost(payload)`
- **Mock Data Source**: Generates new post object
- **Simulated Delay**: 500ms
- **Request**:
```json
{
  "title": "string",
  "content": "string",
  "document_id": "string (optional)"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Post created successfully",
  "data": {
    "id": "number",
    "user_id": "string",
    "title": "string",
    "content": "string",
    "timestamp": "timestamp",
    "likes": 0,
    "comments": 0
  }
}
```
- **Note**: Replace with real API at `/api/v1/Feed/Posts` when backend available

---

#### 4.3 Delete Feed Post
- **Status**: MOCK API
- **Method**: DELETE
- **Implementation**: `src/actions/feedActions.js` - `deleteFeedPost(postId)`
- **Simulated Delay**: 300ms
- **Request Parameter**: postId in URL
- **Response**:
```json
{
  "success": boolean,
  "message": "Post deleted successfully",
  "data": {
    "id": "string"
  }
}
```
- **Note**: Replace with real API at `/api/v1/Feed/Posts/{postId}` when backend available

---

#### 4.4 Like Feed Post
- **Status**: MOCK API
- **Method**: POST
- **Implementation**: `src/actions/feedActions.js` - `likeFeedPost(postId)`
- **Simulated Delay**: 200ms
- **Request Parameter**: postId in URL
- **Response**:
```json
{
  "success": boolean,
  "message": "Post liked",
  "data": {
    "postId": "string"
  }
}
```
- **Note**: Replace with real API at `/api/v1/Feed/Posts/{postId}/like` when backend available

---

#### 4.5 Unlike Feed Post
- **Status**: MOCK API
- **Method**: POST
- **Implementation**: `src/actions/feedActions.js` - `unlikeFeedPost(postId)`
- **Simulated Delay**: 200ms
- **Request Parameter**: postId in URL
- **Response**:
```json
{
  "success": boolean,
  "message": "Like removed",
  "data": {
    "postId": "string"
  }
}
```
- **Note**: Replace with real API at `/api/v1/Feed/Posts/{postId}/unlike` when backend available

---

#### 4.6 Get Feed Post Comments
- **Status**: MOCK API
- **Method**: GET
- **Implementation**: `src/actions/feedActions.js` - `getFeedPostComments(postId)`
- **Simulated Delay**: 300ms
- **Response**:
```json
{
  "success": boolean,
  "data": []
}
```
- **Note**: Replace with real API at `/api/v1/Feed/Posts/{postId}/comments` when backend available

---

#### 4.7 Add Feed Post Comment
- **Status**: MOCK API
- **Method**: POST
- **Implementation**: `src/actions/feedActions.js` - `addFeedPostComment(postId, comment)`
- **Simulated Delay**: 300ms
- **Request**:
```json
{
  "postId": "string",
  "comment": "string"
}
```
- **Response**:
```json
{
  "success": boolean,
  "message": "Comment added",
  "data": {
    "postId": "string",
    "comment": "string",
    "timestamp": "timestamp"
  }
}
```
- **Note**: Replace with real API at `/api/v1/Feed/Posts/{postId}/comments` when backend available

---

## API Summary Table

| # | API Name | Type | Status | Method | Endpoint |
|---|----------|------|--------|--------|----------|
| 1 | Sign Up | Auth | LIVE | POST | `/api/v1/SignUp` |
| 2 | Sign In | Auth | LIVE | POST | `/api/v1/SignIn` |
| 3 | Google OAuth | Auth | LIVE | POST | `/api/v1/Google/OAuth` |
| 4 | Request OTP | Auth | LIVE | POST | `/api/v1/ForgetPassword` |
| 5 | Verify OTP | Auth | LIVE | POST | `/api/v1/VerifyOTP` |
| 6 | Reset Password | Auth | LIVE | PATCH | `/api/v1/ResetPassword` |
| 7 | Get Documents | Doc | LIVE | GET | `/api/v1/Documents/DocumentsList` |
| 8 | Upload Document | Doc | LIVE | POST | `/api/v1/Documents/UploadDocument` |
| 9 | Delete Document | Doc | LIVE | DELETE | `/api/v1/Documents/DeleteDocument/{id}` |
| 10 | Get Categories | Doc | LIVE | GET | `/api/v1/Documents/CategoryMaster` |
| 11 | Download Document | Doc | LIVE | GET | `/api/v1/Documents/DocumentsList/{id}/download` |
| 12 | Get User Details | User | LIVE | GET | `/api/v1/User/Details` |
| 13 | Update User | User | LIVE | PATCH | `/api/v1/User/Details/Update` |
| 14 | Update Password | User | LIVE | PATCH | `/api/v1/User/Password/Update` |
| 15 | Delete Account | User | LIVE | DELETE | `/api/v1/User/Delete` |
| 16 | Update Avatar | User | LIVE | PATCH | `/api/v1/User/Details/Update` |
| 17 | Get Feed Posts | Feed | MOCK | GET | N/A |
| 18 | Create Post | Feed | MOCK | POST | N/A |
| 19 | Delete Post | Feed | MOCK | DELETE | N/A |
| 20 | Like Post | Feed | MOCK | POST | N/A |
| 21 | Unlike Post | Feed | MOCK | POST | N/A |
| 22 | Get Comments | Feed | MOCK | GET | N/A |
| 23 | Add Comment | Feed | MOCK | POST | N/A |

---

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "message": "error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "additional details"
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (no permission)
- `404` - Not Found
- `422` - Unprocessable Entity (invalid data)
- `500` - Server Error

### Error Message Categories
- **Auth Errors**: `messages.auth.*`
- **Document Errors**: `messages.document.*`
- **User Errors**: `messages.user.*`
- **Feed Errors**: `messages.feed.*`
- **Validation Errors**: `messages.validation.*`
- **General Errors**: `messages.general.*`

---

## Data Models

### User Model
```javascript
{
  user_id: String,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  first_name: String,
  last_name: String,
  avatar: String (URL),
  bio: String,
  subscription_tier: "free" | "pro" | "enterprise",
  subscription_expiry: Date,
  total_documents: Number,
  total_storage_used: Number,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date (soft delete)
}
```

### Document Model
```javascript
{
  document_id: String,
  user_id: String (FK),
  name: String,
  description: String,
  file_type: String,
  file_size: Number,
  file_url: String (S3/Cloud storage),
  category_id: Number (FK),
  status: "active" | "archived" | "deleted",
  download_count: Number,
  upload_date: Date,
  last_modified: Date,
  deleted_at: Date (soft delete)
}
```

### Document Category Model
```javascript
{
  category_id: Number,
  name: String,
  description: String,
  icon: String (icon name or URL)
}
```

### Feed Post Model (Mock)
```javascript
{
  id: Number,
  user_id: String,
  username: String,
  avatar: String,
  title: String,
  content: String,
  document_id: String (optional),
  file_url: String (optional),
  timestamp: Date,
  likes: Number,
  comments: Number,
  shares: Number
}
```

---

## Authentication Flow

### Login Flow
```
1. User enters credentials
2. POST /api/v1/SignIn with email + password
3. Server validates and returns JWT token
4. Token stored in localStorage
5. Set Authorization header for all subsequent requests
6. User redirected to dashboard
```

### Password Reset Flow
```
1. User clicks "Forgot Password"
2. POST /api/v1/ForgetPassword with email/username
3. Server sends OTP to email
4. User enters OTP
5. POST /api/v1/VerifyOTP with otpId + otp
6. Server returns verificationToken
7. POST /api/v1/ResetPassword with verificationToken + newPassword
8. Password updated
9. User redirected to login
```

### Document Upload Flow
```
1. User selects file from device
2. User fills name, description, category
3. POST /api/v1/Documents/UploadDocument (multipart/form-data)
4. Server validates file
5. Stores file in cloud storage (S3/etc)
6. Saves metadata in database
7. Returns document_id and download_url
8. Document appears in user's document list
```

---

## File Format Support

### Supported Document Formats
- **PDF**: .pdf
- **Microsoft Word**: .doc, .docx
- **Microsoft Excel**: .xls, .xlsx
- **CSV**: .csv

### Supported Image Formats
- **JPEG**: .jpeg, .jpg
- **PNG**: .png
- **SVG**: .svg

### Format Conversions
The app supports format conversion suggestions:
- CSV can convert to: XLS, XLSX
- XLS can convert to: CSV, XLSX
- XLSX can convert to: CSV, XLS
- DOC can convert to: PDF, DOCX
- DOCX can convert to: PDF, DOC
- PDF can convert to: DOC, DOCX
- JPEG can convert to: JPG, PNG, SVG
- JPG can convert to: JPEG, PNG, SVG
- PNG can convert to: JPEG, JPG, SVG
- SVG can convert to: JPEG, JPG, PNG

---

## Rate Limiting (Recommended)

For production implementation:
- Auth endpoints: 5 requests per minute per IP
- Document endpoints: 30 requests per minute per user
- User endpoints: 20 requests per minute per user
- Feed endpoints: 60 requests per minute per user

---

## Security Considerations

1. **JWT Tokens**: 
   - Store in localStorage (consider httpOnly cookies in prod)
   - Include in Authorization header for protected requests
   - Token expiry: Implement refresh token mechanism

2. **Password Security**:
   - Hash with bcrypt (rounds: 10+)
   - Minimum 8 characters
   - Must contain: uppercase, lowercase, number, special char
   - Never log passwords

3. **File Security**:
   - Validate file type on client & server
   - Scan for malware/viruses
   - Store in secure cloud storage
   - Generate signed URLs for downloads

4. **Database Security**:
   - Use parameterized queries to prevent SQL injection
   - Implement Row Level Security (RLS)
   - Encrypt sensitive fields
   - Regular backups

---

## Future API Endpoints (To Be Implemented)

- `GET /api/v1/Feed/Posts` - Live Feed API
- `POST /api/v1/Feed/Posts` - Create Post API
- `DELETE /api/v1/Feed/Posts/{postId}` - Delete Post API
- `POST /api/v1/Feed/Posts/{postId}/like` - Like Post API
- `POST /api/v1/Feed/Posts/{postId}/unlike` - Unlike Post API
- `GET /api/v1/Feed/Posts/{postId}/comments` - Get Comments API
- `POST /api/v1/Feed/Posts/{postId}/comments` - Add Comment API
- `GET /api/v1/Pricing/Plans` - Get Pricing Plans API
- `POST /api/v1/Subscription/Upgrade` - Upgrade Plan API
- `GET /api/v1/Downloads/History` - Download History API

---

## Testing

### Authentication Testing
```bash
# Test Sign Up
curl -X POST http://localhost:3000/api/v1/SignUp \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test@1234"}'

# Test Sign In
curl -X POST http://localhost:3000/api/v1/SignIn \
  -H "Content-Type: application/json" \
  -d '{"identifier":"testuser","password":"Test@1234"}'
```

### Document Testing
```bash
# Test Upload (requires token)
curl -X POST http://localhost:3000/api/v1/Documents/UploadDocument \
  -H "Authorization: Bearer {token}" \
  -F "file=@document.pdf" \
  -F "name=My Document" \
  -F "category_id=1"

# Test Get Documents
curl -X GET http://localhost:3000/api/v1/Documents/DocumentsList \
  -H "Authorization: Bearer {token}"
```

---

## Conclusion

This documentation covers all 23 APIs in the DocuVault project:
- **16 LIVE APIs** connected to backend services
- **7 MOCK APIs** for Feed functionality (ready to be replaced with real APIs)

All APIs follow RESTful principles and include proper error handling, validation, and security measures.
