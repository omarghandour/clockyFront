"use client";
// Signup.tsx
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
      });

      // Handle successful signup (store token, navigate, etc.)
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
