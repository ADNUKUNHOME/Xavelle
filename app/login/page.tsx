"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/authLayout";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Welcome back to Xavelle");
            if (data.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            toast.error(data.message || "Invalid credentials");
        }

        setLoading(false);
    };

    return (
        <AuthLayout
            title="Sign In"
            subtitle="Access your exclusive Xavelle account"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs uppercase tracking-wide text-neutral-400">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@xavelle.com"
                        className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-wide text-neutral-400">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-neutral-400">
                Don’t have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-white hover:underline"
                >
                    Create one
                </Link>
            </div>
        </AuthLayout>
    );
}