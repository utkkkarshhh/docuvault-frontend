const registerToken = import.meta.env.VITE_APP_REGISTER_TOKEN;
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const apiEndpoints = {
    // Authentication Endpoints
    "signUp" : `${baseUrl}/api/v1/SignUp`,
    "signIn" : `${baseUrl}/api/v1/SignIn`,
    "signInWithGoogle": `${baseUrl}/api/v1/Google/OAuth`,
    "forgetPassword": `${baseUrl}/api/v1/ForgetPassword`,
    "verifyOTP": `${baseUrl}/api/v1/VerifyOTP`,
    "resetPassword": `${baseUrl}/api/v1/ResetPassword`,

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

