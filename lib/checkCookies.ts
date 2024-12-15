// utils/checkCookies.js
export const areCookiesEnabled = () => {
  try {
    document.cookie = "testcookie=1; SameSite=Strict";
    const cookiesEnabled = document.cookie.indexOf("testcookie=") !== -1;
    if (cookiesEnabled) {
      document.cookie =
        "testcookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict"; // Delete test cookie
    }
    return cookiesEnabled;
  } catch {
    return false;
  }
};
