"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-5">
      <form
        onSubmit={handleLogin}
        className="bg-sand w-full max-w-sm p-8"
      >
        <h1 className="font-display text-2xl text-charcoal mb-1">Store Login</h1>
        <p className="text-charcoal/60 text-sm mb-6">
          Owner access only.
        </p>

        <label className="label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field mb-4"
        />

        <label className="label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field mb-6"
        />

        {error && (
          <p className="text-rust text-sm mb-4">{error}</p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
