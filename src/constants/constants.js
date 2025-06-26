const registerToken = import.meta.env.VITE_APP_REGISTER_TOKEN;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const apiEndpoints = {
    // Authentication Endpoints
    "signUp" : `${baseUrl}/api/v1/SignUp`,
    "signIn" : `${baseUrl}/api/v1/SignIn`,
    "signUnWithGoogle": `${baseUrl}/api/v1/SignIn`,
    "signInWithGoogle": `${baseUrl}/api/v1/SignIn`,

    // Document Endpoints
    "getAllUserDocuments" : `${baseUrl}/api/v1/Documents/DocumentsList`,
    "deleteDocument": `${baseUrl}/api/v1/Documents/DeleteDocument`,
    "categoryMaster": `${baseUrl}/api/v1/Documents/CategoryMaster`,
    "uploadDocument": `${baseUrl}/api/v1/Documents/UploadDocument`,

    // User Endpoints
    "getUserDetails" : `${baseUrl}/api/v1/User/Details`,
    "updateUserDetails" : `${baseUrl}/api/v1/User/Details/Update`,
    "updateUserPassword" : `${baseUrl}/api/v1/User/Password/Update`,
    "deleteUser": `${baseUrl}/api/v1/User/Delete`,
}

export {registerToken, baseUrl, apiEndpoints}

