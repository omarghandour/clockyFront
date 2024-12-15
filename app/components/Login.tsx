"use client";
// Login.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import Next.js router
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosConfig";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const router = useRouter();

  // Check if a token exists on page load and redirect to home
  useEffect(() => {
    setUrl(window.location.pathname);
    const token = localStorage.getItem("token");
    if (token && url === "/login") {
      router.push("/"); // Redirect to home if token is found
    }
  }, [router, url]);
  // console.log(url);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      let response;
      if (isLogin) {
        // Login API call
        response = await axios.post(
          "https://express.clockyeg.com/api/users/login",
          {
            email,
            password,
          },
          {
            withCredentials: true, // Include credentials like cookies or authorization headers
          }
        );
      } else {
        // Signup API call
        response = await axiosInstance.post("/users/register", {
          name,
          email,
          password,
        });
      }

      const { token, ...userData } = response.data;
      console.log(response);

      // Save token in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userData._id); // Save user data in local storage

      // Navigate to home page after login/signup
      if (url === "/login") {
        router.push("/");
      } else {
        router.refresh();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div
      className={`${
        url === "/login" ? "min-h-dvh bg-white" : ""
      } flex items-center justify-center mt-20  text-white p-4`}
    >
      <div className="bg-main shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Error Display */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                className="border-none bg-white text-black"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required={!isLogin}
                disabled={loading}
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="border-none bg-white text-black"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              className="border-none bg-white text-black"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              // swor
              disabled={loading}
            />
          </div>
          {/* Submit Button with Loading Feedback */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-two hover:text-white"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button
            variant="link"
            className="text-two hover:text-white"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
