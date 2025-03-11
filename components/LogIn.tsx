"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function LogInForm() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      router.push("/case-records");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="relative h-screen bg-blue-50 flex items-center justify-center p-10 mx-auto overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/logo.png')] opacity-5 bg-center 
    bg-repeat-space bg-[size:150px] lg:bg-[size:220px] 2xl:bg-[size:220px]"
      ></div>

      {/* Login Form - Positioned Above Everything */}
      <div className="relative z-10">
      <div className="max-w-3xl min-h-[350px] h-full md:flex items-stretch justify-center rounded-xl overflow-hidden shadow-lg">
      {/* Left Panel (Welcome Section) */}
      <div className="bg-blue-900 px-8 flex flex-col items-center justify-center flex-1 text-white">
        <h1 className="text-2xl font-bold mb-4">Welcome Admin!</h1>
        <Image src="/logo.png" alt="Logo" width={100} height={80} />
        <h2 className="mt-4 text-lg text-center text-pretty">
          Talisay Municipal Police Station
        </h2>
      </div>

      {/* Right Panel (Login Form) */}
      <div className="bg-white flex flex-col items-center justify-center px-8 py-16 flex-1">
        <h1 className="text-2xl font-semibold mb-4 text-blue-950">
          Login to your Account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label className="text-xs mb-1 text-blue-950/50" htmlFor="username">
            Username
          </label>
          <input
            className="text-base text-blue-950 px-2 py-1.5 w-full border-b-2 border-blue-300 focus:outline-none focus:border-b-2 focus:border-blue-500"
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <label
            className="text-xs mt-4 mb-1 text-blue-950/50"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="text-base text-blue-950 px-2 py-1.5 w-full border-b-2 border-blue-300 focus:outline-none focus:border-b-2 focus:border-blue-500"
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="bg-blue-500 text-white mt-6 px-8 py-2 rounded-md w-full cursor-pointer"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
      </div>
    </main>
  );
}
