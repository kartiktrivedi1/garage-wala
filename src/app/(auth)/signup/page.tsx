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
import { User, Wrench, Shield } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});
type FormValues = z.infer<typeof schema>;

const roles: { value: UserRole; label: string; icon: typeof User }[] = [
  { value: "customer", label: "Customer", icon: User },
  { value: "garage", label: "Garage", icon: Wrench },
  { value: "admin", label: "Admin", icon: Shield },
];

export default function SignupPage() {
  const [role, setRole] = useState<UserRole>("customer");
  const [error, setError] = useState<string | null>(null);
  const { signUp, logInWithGoogle } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await signUp(values.name, values.email, values.password, role);
      router.push(`/dashboard/${role}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
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
      <h1 className="font-display text-2xl font-extrabold">Create your account</h1>
      <p className="mt-1 text-sm text-white/60">Join Garage Wala in seconds.</p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-semibold transition-colors ${
                role === r.value
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-white/10 text-white/60"
              }`}
            >
              <Icon className="h-4 w-4" /> {r.label}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-2 text-xs text-red-300">{error}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Label className="text-white/70">Full Name</Label>
          <Input placeholder="Your name" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-brand">{errors.name.message}</p>}
        </div>
        <div>
          <Label className="text-white/70">Email</Label>
          <Input type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-brand">{errors.email.message}</p>}
        </div>
        <div>
          <Label className="text-white/70">Password</Label>
          <Input type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && <p className="mt-1 text-xs text-brand">{errors.password.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/40">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <Button variant="secondary" className="w-full" onClick={onGoogle}>
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand">
          Log in
        </Link>
      </p>
    </Card>
  );
}
