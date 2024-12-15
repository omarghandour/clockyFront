"use client";
// components/CookiesWarning.js
import { useEffect, useState } from "react";
import { areCookiesEnabled } from "@/lib/checkCookies";
const CookiesWarning = () => {
  const [cookiesEnabled, setCookiesEnabled] = useState<boolean>();

  useEffect(() => {
    setCookiesEnabled(areCookiesEnabled());
  }, []);

  const openBrowserSettings = () => {
    // This opens a helpful guide for enabling cookies.
    // Unfortunately, there is no universal API to directly open browser settings.
    window.open(
      "https://www.whatismybrowser.com/guides/how-to-enable-cookies/",
      "_blank"
    );
  };

  if (cookiesEnabled) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#ffeeba",
        color: "#856404",
        padding: "15px",
        border: "1px solid #ffeeba",
        borderRadius: "5px",
        textAlign: "center",
        position: "fixed",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "80%",
        maxWidth: "500px",
      }}
    >
      <p>
        Cookies are disabled in your browser. To fully use this website, please
        enable cookies in your browser settings.
      </p>
      <button
        onClick={openBrowserSettings}
        style={{
          backgroundColor: "#856404",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Enable Cookies
      </button>
    </div>
  );
};

export default CookiesWarning;
