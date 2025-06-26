export const parseApiError = (error) => {
  const data = error?.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors[0];
  }

  if (Array.isArray(data?.error) && data.error.length) {
    return data.error[0];
  }

  if (typeof data?.error === "string") {
    return data.error;
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  return error.message || "Something went wrong.";
};
