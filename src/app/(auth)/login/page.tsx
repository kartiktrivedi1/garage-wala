"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useAuth, type UserRole } from "@/contexts/auth-context";
import { Smartphone, User, Wrench, Shield } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});
type FormValues = z.infer<typeof schema>;

const roles: { value: UserRole; label: string; icon: typeof User }[] = [
  { value: "customer", label: "Customer", icon: User },
  { value: "garage", label: "Garage", icon: Wrench },
  { value: "admin", label: "Admin", icon: Shield },
];

export default function LoginPage() {
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [role, setRole] = useState<UserRole>("customer");
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const { logIn, logInWithGoogle } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await logIn(values.email, values.password);
      window.localStorage.setItem("garagewala_role", role);
      router.push(`/dashboard/${role}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid email or password");
    }
  }

  async function onGoogle() {
    setError(null);
    try {
      await logInWithGoogle(role);
      router.push(`/dashboard/${role}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <h1 className="font-display text-2xl font-extrabold">Welcome back</h1>
      <p className="mt-1 text-sm text-white/60">Log in to track your service or manage your garage.</p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition-colors ${
                role === r.value
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-white/10 text-white/50 hover:border-white/20"
              }`}
            >
              <Icon className="h-4 w-4" /> {r.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2 rounded-xl border border-white/10 p-1">
        <button
          onClick={() => setMode("password")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
            mode === "password" ? "bg-brand text-white" : "text-white/60"
          }`}
        >
          Email & Password
        </button>
        <button
          onClick={() => setMode("otp")}
          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
            mode === "otp" ? "bg-brand text-white" : "text-white/60"
          }`}
        >
          OTP Login
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-2 text-xs text-red-300">{error}</p>
      )}

      {mode === "password" ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <Label className="text-white/70">Email</Label>
            <Input type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-brand">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-white/70">Password</Label>
              <Link href="/forgot-password" className="text-xs text-brand">
                Forgot password?
              </Link>
            </div>
            <Input type="password" placeholder="••••••••" {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-brand">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
      ) : (
        <div className="mt-6 space-y-4">
          <div>
            <Label className="text-white/70">Phone Number</Label>
            <Input
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {otpSent && (
            <div>
              <Label className="text-white/70">Enter OTP</Label>
              <Input placeholder="6-digit code" maxLength={6} />
            </div>
          )}
          <Button className="w-full" onClick={() => setOtpSent(true)} disabled={!phone}>
            <Smartphone className="h-4 w-4" /> {otpSent ? "Verify & Log In" : "Send OTP"}
          </Button>
          <p className="text-center text-xs text-white/40">
            OTP login uses Firebase Phone Auth — enable it in your Firebase console and add a
            reCAPTCHA container to wire this up fully.
          </p>
        </div>
      )}

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/40">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <Button variant="secondary" className="w-full" onClick={() => onGoogle()}>
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-white/60">
        New to Garage Wala?{" "}
        <Link href="/signup" className="font-semibold text-brand">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
