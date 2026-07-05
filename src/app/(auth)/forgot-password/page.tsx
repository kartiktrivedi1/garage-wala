"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      {sent ? (
        <div className="flex flex-col items-center py-6 text-center">
          <MailCheck className="h-10 w-10 text-brand" />
          <h1 className="mt-4 font-display text-xl font-bold">Check your inbox</h1>
          <p className="mt-2 text-sm text-white/60">
            We&rsquo;ve sent a password reset link to {email}.
          </p>
        </div>
      ) : (
        <>
          <h1 className="font-display text-2xl font-extrabold">Reset your password</h1>
          <p className="mt-1 text-sm text-white/60">
            Enter your email and we&rsquo;ll send you a reset link.
          </p>
          {error && (
            <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-2 text-xs text-red-300">{error}</p>
          )}
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label className="text-white/70">Email</Label>
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </>
      )}
      <p className="mt-6 text-center text-sm text-white/60">
        <Link href="/login" className="font-semibold text-brand">
          Back to login
        </Link>
      </p>
    </Card>
  );
}
