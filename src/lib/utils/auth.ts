export const setReturnUrl = (url) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("returnUrl", url);
  }
};

export const getReturnUrl = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("returnUrl") || "/";
  }
  return "/";
};

export const clearReturnUrl = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("returnUrl");
  }
};
