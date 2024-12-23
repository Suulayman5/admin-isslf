"use client";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for Next.js 13+ app directory
import BlogForm from "../components/admin/form";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (error) {
      alert("Login failed: " + (error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form onSubmit={handleLogin} className="p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 rounded">
          Login
        </button>
      </form>
      <BlogForm/>
    </div>
  );
};

export default Login;
