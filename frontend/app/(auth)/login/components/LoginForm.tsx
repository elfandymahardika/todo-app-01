"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username || !password) {
      setError("Username/email dan password wajib diisi.");
      return;
    }

    setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = (await response.json()) as { message?: string; token?: string; data?: unknown };
      if (!response.ok || !result.token) {
        setError(result.message ?? "Login gagal.");
        return;
      }
      localStorage.setItem("todo-token", result.token);
      localStorage.setItem("todo-user", JSON.stringify(result.data));
      localStorage.setItem("todo-authenticated", "true");
      router.push("/todos");
    } catch {
      setError("Backend tidak dapat dihubungi. Jalankan server terlebih dahulu.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email / Username
        </label>
        <input
          type="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Masukkan email atau username"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Masukkan password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
      </div>

      <div className="pt-2">
        <button type="submit" className="block text-center w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
          Login
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}