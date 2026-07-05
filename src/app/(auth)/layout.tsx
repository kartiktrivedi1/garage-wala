import Link from "next/link";
import { Wrench } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-brand-glow/15 blur-[110px]" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-lg font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
            <Wrench className="h-4.5 w-4.5" />
          </span>
          Garage<span className="text-brand">Wala</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
