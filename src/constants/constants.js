const registerToken = import.meta.env.VITE_APP_REGISTER_TOKEN;
const baseUrl = import.meta.env.VITE_APP_BASE_URL || "";

const apiEndpoints = {
    // Authentication Endpoints
    "signUp" : "/api/v1/SignUp",
    "signIn" : "/api/v1/SignIn",
    "signInWithGoogle": "/api/v1/Google/OAuth",
    "forgetPassword": "/api/v1/ForgetPassword",
    "verifyOTP": "/api/v1/VerifyOTP",
    "resetPassword": "/api/v1/ResetPassword",

    // Document Endpoints
    "getAllUserDocuments" : "/api/v1/Documents/DocumentsList",
    "deleteDocument": "/api/v1/Documents/DeleteDocument",
    "categoryMaster": "/api/v1/Documents/CategoryMaster",
    "getDocumentTypes": "/api/v1/Documents/CategoryMaster",
    "uploadDocument": "/api/v1/Documents/UploadDocument",

    // User Endpoints
    "getUserDetails" : "/api/v1/User/Details",
    "updateUserDetails" : "/api/v1/User/Details/Update",
    "updateUserPassword" : "/api/v1/User/Password/Update",
    "deleteUser": "/api/v1/User/Delete",
}

    const supportedTypeMapping = {
    document: ["pdf", "doc", "docx", "xls", "xlsx", "csv"],
    image: ["jpeg", "jpg", "png", "svg"],
    };

    const supportedFormatMapping = {
    csv: ["xls", "xlsx"],
    xls: ["csv", "xlsx"],
    xlsx: ["csv", "xls"],
    doc: ["pdf", "docx"],
    docx: ["pdf", "doc"],
    pdf: ["doc", "docx"],
    jpeg: ["jpg", "png", "svg"],
    jpg: ["jpeg", "png", "svg"],
    png: ["jpeg", "jpg", "svg"],
    svg: ["jpeg", "jpg", "png"],
    };

export {registerToken, baseUrl, apiEndpoints, supportedTypeMapping, supportedFormatMapping}

