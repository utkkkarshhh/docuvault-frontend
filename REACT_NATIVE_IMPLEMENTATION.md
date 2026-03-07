# DocuVault - React Native Implementation Guide

## Project Overview

DocuVault is a modern document management and sharing platform built with a clean, minimal SaaS design. This document provides complete specifications for implementing the app in React Native with React Navigation and Firebase for backend integration.

---

## Table of Contents

1. [Architecture & Navigation](#architecture--navigation)
2. [Screens & UI Components](#screens--ui-components)
3. [API Endpoints & Integration](#api-endpoints--integration)
4. [Data Flow & State Management](#data-flow--state-management)
5. [Authentication Flow](#authentication-flow)
6. [Database Schema](#database-schema)
7. [File Handling & Upload](#file-handling--upload)
8. [Error Handling & Messages](#error-handling--messages)

---

## Architecture & Navigation

### Tech Stack
- **Framework**: React Native (Expo for easier setup)
- **Navigation**: React Navigation (Tab Navigator + Stack Navigator)
- **State Management**: Redux or Context API
- **HTTP Client**: Axios
- **Authentication**: JWT tokens stored in AsyncStorage
- **File Upload**: React Native file handling with FormData

### Navigation Structure

```
RootNavigator
├── AuthStack (when not authenticated)
│   ├── Landing Screen
│   ├── Login Screen
│   ├── Register Screen
│   ├── Reset Password Screen (3 steps)
│   └── Pricing Screen
└── AppStack (when authenticated)
    ├── Dashboard (Home)
    ├── Feed Screen
    ├── Download History Screen
    ├── Profile Screen
    └── Settings Screen
```

---

## Screens & UI Components

### 1. Landing Screen (Public)

**Route**: `/` or `landing`

**Purpose**: Homepage showcasing the app features and pricing

**Key Features**:
- Hero section with app branding
- Features overview (4 feature cards)
- Pricing tiers preview (3 cards)
- Call-to-action buttons (Get Started, View Pricing, Sign In)
- Responsive design for mobile

**Components to Build**:
- `HeroSection` - Main headline and CTA
- `FeatureCard` - Individual feature display
- `PricingPreview` - Quick pricing overview
- `Footer` - Navigation links

**State Management**:
- No API calls required (static content)
- Navigation state for tab/navigation switching

**Design Details**:
- Clean, modern SaaS aesthetic
- Blue primary color (#1F8FE8)
- Dark mode optimized
- Typography: Inter font family
- Spacing: Consistent padding/margins following design system

---

### 2. Login Screen (Public)

**Route**: `/login`

**Purpose**: User authentication with email/password

**Key Features**:
- Email/Username input field
- Password input with show/hide toggle
- "Forgot Password?" link
- Google OAuth button (optional)
- Sign up link
- Form validation
- Loading state during submission

**API Endpoint**:
```
POST /api/v1/SignIn
Body: {
  identifier: "email or username",
  password: "password"
}
Response: {
  success: boolean,
  token: "JWT_TOKEN",
  user: {
    user_id: "unique_id",
    username: "username",
    email: "email@example.com",
    ...
  }
}
```

**Components to Build**:
- `InputField` - Email/Password input with validation
- `PasswordToggle` - Show/Hide password
- `LoginForm` - Main form container
- `SocialLoginButton` - Google OAuth

**State Management**:
- Form input state (email, password)
- Loading state during API call
- Error messages display
- Token storage in AsyncStorage after successful login

**Data Flow**:
1. User enters email/password
2. Form validation
3. API call to login endpoint
4. Store JWT token in AsyncStorage
5. Store user details in Redux/Context
6. Redirect to Dashboard

**Error Handling**:
- Invalid credentials error
- Network error
- Session expired error

---

### 3. Register Screen (Public)

**Route**: `/register`

**Purpose**: New user account creation

**Key Features**:
- Username input
- Email input
- Password input with strength indicator
- Confirm password field
- Terms & Conditions checkbox
- Google OAuth button (optional)
- Form validation with real-time feedback

**API Endpoint**:
```
POST /api/v1/SignUp
Body: {
  username: "username",
  email: "email@example.com",
  password: "password",
  confirm_password: "password"
}
Response: {
  success: boolean,
  message: "Account created successfully",
  user: {
    user_id: "unique_id",
    username: "username",
    email: "email@example.com"
  }
}
```

**Components to Build**:
- `UsernameInput` - With availability check
- `EmailInput` - With format validation
- `PasswordStrengthMeter` - Visual strength indicator
- `TermsCheckbox` - Legal acceptance
- `RegisterForm` - Main form

**Validation Rules**:
- Email: Valid email format required
- Password: Min 8 chars, uppercase, lowercase, number, special char
- Username: Alphanumeric, underscores allowed, min 3 chars
- Confirm Password: Must match password field

**State Management**:
- Form input states
- Password strength indicator state
- Loading state
- Validation errors

---

### 4. Reset Password Screen (Public)

**Route**: `/reset-password`

**Purpose**: 3-step password reset flow

**Step 1: Email Entry**
- Email/Username input
- Resend OTP option

**API Endpoint**:
```
POST /api/v1/ForgetPassword
Body: {
  identifier: "email or username"
}
Response: {
  success: boolean,
  message: "OTP sent to email"
}
```

**Step 2: OTP Verification**
- 6-digit OTP input (numeric keyboard)
- Resend OTP timer (60 seconds)
- Resend OTP button

**API Endpoint**:
```
POST /api/v1/VerifyOTP
Body: {
  identifier: "email",
  otp: "123456"
}
Response: {
  success: boolean,
  message: "OTP verified",
  reset_token: "temporary_token"
}
```

**Step 3: New Password**
- New password input
- Confirm password input
- Password strength meter

**API Endpoint**:
```
PATCH /api/v1/ResetPassword
Body: {
  identifier: "email",
  reset_token: "temporary_token",
  new_password: "newpassword",
  confirm_password: "newpassword"
}
Response: {
  success: boolean,
  message: "Password reset successfully"
}
```

**Components to Build**:
- `EmailStep` - Email entry form
- `OTPStep` - OTP input and timer
- `PasswordStep` - New password form
- `ProgressIndicator` - 3-step progress bar
- `ResendTimer` - Countdown timer for resend

**State Management**:
- Current step state
- Identifier (email) state
- OTP input state
- Password input state
- Timer for resend
- Reset token for security

---

### 5. Pricing Screen (Public & Protected)

**Route**: `/pricing`

**Purpose**: Display pricing plans and subscription options

**Key Features**:
- 3 pricing tiers: Starter, Professional, Enterprise
- Feature comparison
- CTA buttons (Get Started, Contact Sales)
- Highlighted recommended plan
- Responsive grid layout

**Data Structure** (Mock Data):
```javascript
{
  id: 1,
  name: "Starter",
  description: "Perfect for individuals",
  price: 29,
  period: "month",
  features: [...],
  highlighted: false
}
```

**Components to Build**:
- `PricingCard` - Individual pricing tier
- `PricingGrid` - Container for 3 cards
- `FeatureList` - Checkmark list of features
- `ComparisonTable` - Feature comparison (optional)

**Data Flow**:
- No API call required (mock data included)
- Display pricing tiers from constants
- On CTA click: Navigate to Register (if public) or upgrade flow (if authenticated)

---

### 6. Dashboard / Home Screen (Protected)

**Route**: `/dashboard` or `/home`

**Purpose**: Main authenticated user interface for document management

**Key Features**:
- Welcome message with user's first name
- Quick stats: Recent uploads, Storage used, Total files
- Upload document section
- Document list with filters
- Search functionality

**Components to Build**:
- `Header` - Welcome message and user info
- `QuickStats` - 3-card stats display
- `UploadSection` - File picker and upload form
- `DocumentCard` - Individual document display
- `DocumentList` - Scrollable list of documents
- `FilterBar` - Category filter
- `SearchBar` - Search documents

**API Endpoints**:

**Get all user documents**:
```
GET /api/v1/Documents/DocumentsList
Headers: { Authorization: "Bearer JWT_TOKEN" }
Response: {
  success: boolean,
  documents: [
    {
      document_id: "unique_id",
      filename: "document.pdf",
      category_id: 1,
      category_name: "Invoice",
      upload_date: "2024-03-07",
      file_size: 1024,
      document_type: "pdf",
      ...
    }
  ]
}
```

**Get document categories/types**:
```
GET /api/v1/Documents/CategoryMaster
Headers: { Authorization: "Bearer JWT_TOKEN" }
Response: {
  success: boolean,
  categories: [
    { id: 1, name: "Invoice", icon: "bill" },
    { id: 2, name: "Contract", icon: "file-text" },
    ...
  ]
}
```

**Upload document**:
```
POST /api/v1/Documents/UploadDocument
Headers: {
  Authorization: "Bearer JWT_TOKEN",
  Content-Type: "multipart/form-data"
}
Body (FormData): {
  file: File,
  filename: "document.pdf",
  category_id: 1,
  description: "optional description"
}
Response: {
  success: boolean,
  message: "Document uploaded successfully",
  document: {
    document_id: "new_id",
    filename: "document.pdf",
    ...
  }
}
```

**Delete document**:
```
DELETE /api/v1/Documents/DeleteDocument/{document_id}
Headers: { Authorization: "Bearer JWT_TOKEN" }
Response: {
  success: boolean,
  message: "Document deleted successfully"
}
```

**State Management**:
- Documents list state
- Selected category filter
- Search query state
- Loading state
- Error state

**Data Flow**:
1. Component mounts: Fetch documents + categories
2. User can filter by category, search, or upload
3. Upload: File picker → Form data → API call
4. Delete: Confirm dialog → API call → Refresh list
5. Display documents in list with edit/delete options

---

### 7. Feed Screen (Protected)

**Route**: `/feed`

**Purpose**: Community posts and document sharing

**Key Features**:
- Community posts display
- Post creation form (expandable)
- Like/Comment functionality
- User avatars and metadata
- Timestamp display
- Category tags

**Data Structure** (Mock Data):
```javascript
{
  id: 1,
  author: {
    id: "user_id",
    name: "Author Name",
    avatar: "avatar_url",
    role: "Role"
  },
  title: "Post Title",
  content: "Post content...",
  timestamp: Date,
  category: "Tips & Tricks",
  likes: 24,
  comments: 8,
  image: "optional_image_url"
}
```

**Components to Build**:
- `FeedHeader` - Screen title
- `PostCreationForm` - Create new post (expandable)
- `PostCard` - Individual post display
- `PostList` - Scrollable list of posts
- `UserAvatar` - User profile picture
- `InteractionButtons` - Like, comment, share
- `CommentSection` - Expandable comments

**State Management**:
- Posts list state
- New post form state
- Liked posts state
- Loading state

**Note**: This screen uses mock data for now. API integration can be added later with endpoints for:
- `GET /api/v1/Feed/Posts` - Get all posts
- `POST /api/v1/Feed/Posts` - Create new post
- `POST /api/v1/Feed/Posts/{id}/Like` - Like post
- `DELETE /api/v1/Feed/Posts/{id}` - Delete post

---

### 8. Download History Screen (Protected)

**Route**: `/download-history`

**Purpose**: Track document downloads

**Key Features**:
- Table/List view of download history
- Document name, download date, file size
- Search and filter options
- Delete from history option

**Components to Build**:
- `HistoryHeader` - Screen title
- `HistoryItem` - Individual download record
- `HistoryList` - Scrollable list
- `FilterOptions` - Date range, category filter
- `SearchBar` - Search downloads

**Data Structure** (Mock Data):
```javascript
{
  id: 1,
  document_name: "Report Q1.pdf",
  download_date: "2024-03-07",
  file_size: "2.4 MB",
  category: "Reports"
}
```

**State Management**:
- Download history list
- Filter state
- Search query

**Note**: Uses mock data. API endpoint can be:
- `GET /api/v1/Downloads/History` - Get download history
- `DELETE /api/v1/Downloads/History/{id}` - Remove from history

---

### 9. Profile Screen (Protected)

**Route**: `/profile`

**Purpose**: User profile information and avatar

**Key Features**:
- User avatar display
- User name, email, username
- Profile completion percentage
- Quick links to edit profile
- Subscription status display

**API Endpoints**:

**Get user details**:
```
GET /api/v1/User/Details
Headers: { Authorization: "Bearer JWT_TOKEN" }
Response: {
  success: boolean,
  user: {
    user_id: "unique_id",
    username: "username",
    email: "email@example.com",
    first_name: "First",
    last_name: "Last",
    phone: "phone_number",
    avatar_url: "url",
    created_at: "2024-01-01",
    subscription_plan: "Professional",
    ...
  }
}
```

**Components to Build**:
- `ProfileHeader` - Avatar and name display
- `UserStats` - Quick stats (files, storage)
- `ProfileMenu` - Quick action buttons
- `SubscriptionCard` - Current plan display

**State Management**:
- User details state
- Avatar state
- Loading state

**Data Flow**:
1. Component mounts: Fetch user details
2. Display user information
3. On edit click: Navigate to Settings screen

---

### 10. Settings Screen (Protected)

**Route**: `/settings`

**Purpose**: User preferences and account management

**Key Features**:
- Profile settings (name, email, phone)
- Password change
- Notification preferences
- Account deletion option
- Logout button

**Sections**:

**Profile Settings**:
- First name input
- Last name input
- Phone input
- Email display (read-only)

**API Endpoint**:
```
PATCH /api/v1/User/Details/Update
Headers: { Authorization: "Bearer JWT_TOKEN" }
Body: {
  first_name: "First",
  last_name: "Last",
  phone: "phone_number",
  ...
}
Response: {
  success: boolean,
  message: "Profile updated successfully",
  user: { ... }
}
```

**Password Settings**:
- Current password input
- New password input
- Confirm password input
- Password strength meter

**API Endpoint**:
```
PATCH /api/v1/User/Password/Update
Headers: { Authorization: "Bearer JWT_TOKEN" }
Body: {
  current_password: "current",
  new_password: "new",
  confirm_password: "new"
}
Response: {
  success: boolean,
  message: "Password changed successfully"
}
```

**Danger Zone**:
- Delete account button with confirmation dialog

**API Endpoint**:
```
DELETE /api/v1/User/Delete
Headers: { Authorization: "Bearer JWT_TOKEN" }
Response: {
  success: boolean,
  message: "Account deleted successfully"
}
```

**Components to Build**:
- `SettingsSection` - Group related settings
- `SettingItem` - Individual setting with input
- `PasswordChangeForm` - Change password form
- `ConfirmationDialog` - Delete account confirmation
- `LogoutButton` - Logout action

**State Management**:
- Profile form state
- Password form state
- Loading states
- Error messages

---

## API Endpoints & Integration

### Base URL
```
https://api.docuvault.com (or your backend URL)
```

### Authentication Header
```
Authorization: Bearer {JWT_TOKEN}
```

### Complete Endpoint List

#### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/SignUp` | Register new user |
| POST | `/api/v1/SignIn` | Login user |
| POST | `/api/v1/Google/OAuth` | Google OAuth login |
| POST | `/api/v1/ForgetPassword` | Request password reset OTP |
| POST | `/api/v1/VerifyOTP` | Verify OTP for password reset |
| PATCH | `/api/v1/ResetPassword` | Reset password with OTP |

#### Document Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/Documents/DocumentsList` | Get all user documents | Yes |
| POST | `/api/v1/Documents/UploadDocument` | Upload new document | Yes |
| DELETE | `/api/v1/Documents/DeleteDocument/{id}` | Delete document | Yes |
| GET | `/api/v1/Documents/CategoryMaster` | Get document categories | Yes |

#### User Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/User/Details` | Get user profile | Yes |
| PATCH | `/api/v1/User/Details/Update` | Update user profile | Yes |
| PATCH | `/api/v1/User/Password/Update` | Change password | Yes |
| DELETE | `/api/v1/User/Delete` | Delete user account | Yes |

---

## Data Flow & State Management

### Global State (Redux/Context)

```javascript
// Auth State
{
  isAuthenticated: boolean,
  user: {
    user_id: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    avatar_url: string,
    subscription_plan: string
  },
  token: string,
  loading: boolean,
  error: string | null
}

// Documents State
{
  documents: [
    {
      document_id: string,
      filename: string,
      category_id: number,
      category_name: string,
      upload_date: string,
      file_size: number,
      description: string
    }
  ],
  categories: [
    { id: number, name: string }
  ],
  loading: boolean,
  error: string | null
}

// UI State
{
  selectedCategory: number | null,
  searchQuery: string,
  uploadProgress: number
}
```

### Data Flow Example: Document Upload

```
User selects file
  ↓
Form validation
  ↓
Create FormData with file + metadata
  ↓
Show upload progress
  ↓
API Call: POST /api/v1/Documents/UploadDocument
  ↓
On success:
  - Display success message
  - Refresh documents list
  - Clear form
  ↓
On error:
  - Display error message
  - Keep form data for retry
```

### Data Flow Example: User Login

```
User enters email & password
  ↓
Form validation
  ↓
API Call: POST /api/v1/SignIn
  ↓
On success:
  - Save JWT token in AsyncStorage
  - Save user details in Redux
  - Navigate to Dashboard
  ↓
On error:
  - Display error message
  - Clear password field
  - Keep email for retry
```

---

## Authentication Flow

### Login Flow
```
Landing/Login Screen
  ↓
User enters credentials
  ↓
POST /api/v1/SignIn
  ↓
✓ Success: Store token + user data → Dashboard
✗ Error: Show error message → Retry
```

### Registration Flow
```
Register Screen
  ↓
User enters details + validates
  ↓
POST /api/v1/SignUp
  ↓
✓ Success: Show success message → Redirect to Login
✗ Error: Show error message → Retry
```

### Password Reset Flow
```
Reset Password Screen (3 Steps)
  ↓
Step 1: Enter email/username
  ↓
POST /api/v1/ForgetPassword
  ↓
Step 2: Enter OTP (receive via email)
  ↓
POST /api/v1/VerifyOTP
  ↓
Step 3: Enter new password
  ↓
PATCH /api/v1/ResetPassword
  ↓
✓ Success: Message + redirect to Login
✗ Error: Show error + allow retry
```

### Session Management
- Token stored in AsyncStorage
- Token sent in every protected API request header
- On 401/403 error: Clear token, redirect to Login
- Token refresh logic (if backend supports)

---

## Database Schema

### User Table
```
{
  user_id: UUID (primary key),
  username: STRING (unique),
  email: STRING (unique),
  password_hash: STRING,
  first_name: STRING,
  last_name: STRING,
  phone: STRING (optional),
  avatar_url: STRING (optional),
  subscription_plan: ENUM ('Starter', 'Professional', 'Enterprise'),
  storage_limit: INTEGER (in bytes),
  storage_used: INTEGER (in bytes),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP,
  deleted_at: TIMESTAMP (soft delete)
}
```

### Document Table
```
{
  document_id: UUID (primary key),
  user_id: UUID (foreign key → User),
  filename: STRING,
  original_filename: STRING,
  file_path: STRING,
  file_size: INTEGER (in bytes),
  file_type: STRING (MIME type),
  category_id: INTEGER (foreign key → Category),
  description: TEXT (optional),
  is_public: BOOLEAN,
  upload_date: TIMESTAMP,
  updated_date: TIMESTAMP,
  deleted_at: TIMESTAMP (soft delete)
}
```

### Category Table
```
{
  category_id: INTEGER (primary key),
  category_name: STRING,
  icon: STRING,
  user_id: UUID (optional - for custom categories)
}
```

### Download History Table
```
{
  history_id: UUID (primary key),
  user_id: UUID (foreign key → User),
  document_id: UUID (foreign key → Document),
  download_date: TIMESTAMP
}
```

---

## File Handling & Upload

### Supported File Types
```javascript
supportedTypeMapping = {
  document: ["pdf", "doc", "docx", "xls", "xlsx", "csv"],
  image: ["jpeg", "jpg", "png", "svg"]
}

supportedFormatMapping = {
  csv: ["xls", "xlsx"],
  xls: ["csv", "xlsx"],
  xlsx: ["csv", "xls"],
  doc: ["pdf", "docx"],
  docx: ["pdf", "doc"],
  pdf: ["doc", "docx"],
  jpeg: ["jpg", "png", "svg"],
  jpg: ["jpeg", "png", "svg"],
  png: ["jpeg", "jpg", "svg"],
  svg: ["jpeg", "jpg", "png"]
}
```

### File Upload Process (React Native)

1. **File Picker**:
   - Use `react-native-document-picker` or `react-native-image-picker`
   - Filter by supported file types

2. **Form Data Creation**:
   ```javascript
   const formData = new FormData();
   formData.append('file', {
     uri: file.uri,
     type: file.type,
     name: file.name
   });
   formData.append('filename', 'user-friendly-name');
   formData.append('category_id', categoryId);
   formData.append('description', 'optional description');
   ```

3. **Upload with Progress**:
   - Use axios for HTTP request
   - Show progress bar during upload
   - Handle cancellation

4. **Success/Error Handling**:
   - On success: Refresh documents list
   - On error: Show error message, allow retry

---

## Error Handling & Messages

### Error Response Format
```javascript
{
  success: false,
  message: "Error message from server",
  error: "ERROR_CODE"
}
```

### Response Messages Map

#### Authentication
- `loginSuccess`: "Login successful! Redirecting to dashboard..."
- `loginError`: "Failed to login. Please check your credentials."
- `signupSuccess`: "Account created successfully! Please sign in."
- `signupError`: "Failed to create account. Please try again."
- `passwordResetSuccess`: "Password reset successful! Please sign in."
- `passwordResetError`: "Failed to reset password."
- `otpSentSuccess`: "OTP sent to your email. Please verify."
- `otpVerificationError`: "Invalid OTP. Please try again."
- `sessionExpired`: "Your session has expired. Please sign in again."

#### Documents
- `uploadSuccess`: "Document uploaded successfully!"
- `uploadError`: "Failed to upload document."
- `deleteSuccess`: "Document deleted successfully."
- `deleteError`: "Failed to delete document."
- `documentsLoadError`: "Failed to load documents."
- `fileTooLarge`: "File size exceeds maximum limit."
- `invalidFileType`: "Invalid file type."

#### User
- `profileUpdateSuccess`: "Profile updated successfully."
- `profileUpdateError`: "Failed to update profile."
- `passwordChangeSuccess`: "Password changed successfully."
- `passwordChangeError`: "Failed to change password."
- `accountDeleteSuccess`: "Account deleted successfully."

#### General
- `networkError`: "Network error. Check your connection."
- `invalidInput`: "Please provide valid input."
- `sessionExpired`: "Your session has expired."
- `unauthorizedAccess`: "You don't have permission."

### Global Error Handler

Create a utility function to handle API errors:

```javascript
const handleApiError = (error, defaultMessage) => {
  if (error.response?.status === 401) {
    return responseMessages.auth.sessionExpired;
  }
  if (error.response?.status === 403) {
    return responseMessages.general.unauthorizedAccess;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (!error.response) {
    return responseMessages.general.networkError;
  }
  return defaultMessage || responseMessages.general.error;
}
```

---

## Validation Rules

### Email
- Valid email format required
- Pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Password
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (@, #, $, %, etc.)

### Username
- Alphanumeric and underscores only
- Minimum 3 characters
- Maximum 20 characters

### Phone
- Valid phone number format (country-specific)

### File Size
- Maximum file size: Depends on plan
  - Starter: 5GB total storage
  - Professional: 100GB total storage
  - Enterprise: Unlimited

---

## Development Checklist

### Screen Implementation Order
1. ✓ Landing Screen
2. ✓ Login Screen
3. ✓ Register Screen
4. ✓ Reset Password Screen (3 steps)
5. ✓ Dashboard/Home Screen
6. ✓ Profile Screen
7. ✓ Settings Screen
8. ✓ Feed Screen
9. ✓ Download History Screen
10. ✓ Pricing Screen

### API Integration Checklist
- ✓ Setup Axios client with auth headers
- ✓ Create API service modules for each endpoint
- ✓ Implement token storage/retrieval
- ✓ Setup error handling middleware
- ✓ Create Redux/Context actions
- ✓ Test all endpoints
- ✓ Implement offline handling

### UI/UX Checklist
- ✓ Responsive design for different screen sizes
- ✓ Loading states for all API calls
- ✓ Error messages and toast notifications
- ✓ Form validation feedback
- ✓ Pull-to-refresh functionality
- ✓ Proper navigation transitions
- ✓ Accessibility considerations

### Testing Checklist
- ✓ Unit tests for utility functions
- ✓ Integration tests for API calls
- ✓ Navigation flow testing
- ✓ Error scenario testing
- ✓ Authentication flow testing
- ✓ File upload testing

---

## Notes for Implementation

1. **AsyncStorage**: Use for storing JWT token and user preferences
2. **File Upload**: Handle large files with progress indication
3. **Offline Mode**: Implement cached data display when offline
4. **Security**: Never store passwords locally, use secure token storage
5. **Performance**: Implement pagination for documents list
6. **UX**: Show loading skeletons while fetching data
7. **Notifications**: Use push notifications for file upload completion
8. **Testing**: Use mock API for initial development, switch to real API later

---

## Example API Call Structure (React Native)

```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.docuvault.com';

// Create Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Add auth token to every request
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      AsyncStorage.removeItem('authToken');
      // Navigate to Login
    }
    return Promise.reject(error);
  }
);

// Example API call
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/api/v1/SignIn', {
      identifier: email,
      password: password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
```

---

## Environment Variables

Create a `.env` file with:
```
REACT_APP_API_BASE_URL=https://api.docuvault.com
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

---

**Document Version**: 1.0  
**Last Updated**: March 2024  
**Created For**: React Native Implementation
