"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/authLayout";
import { toast } from "sonner";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Account created successfully");
            router.push("/login");
        } else {
            toast.error(data.message || "Registration failed");
        }

        setLoading(false);
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join Xavelle and experience refined luxury"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs uppercase tracking-wide text-neutral-400">
                        Full Name
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                    />
                </div>

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
                        minLength={6}
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
                    {loading ? "Creating account..." : "Create Account"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-neutral-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-white hover:underline"
                >
                    Sign in
                </Link>
            </div>
        </AuthLayout>
    );
}