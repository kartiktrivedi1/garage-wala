"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#partner", label: "Garage Partner" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { user } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
            scrolled ? "glass h-14 shadow-lg shadow-black/5" : "h-16 bg-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
              <Wrench className="h-4.5 w-4.5" />
            </span>
            Garage<span className="text-brand">Wala</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            {user ? (
              <Link href="/dashboard/customer">
                <Button variant="secondary" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="secondary" size="sm">Log In</Button>
              </Link>
            )}
            <Link href="/signup">
              <Button size="sm">Get Assistance</Button>
            </Link>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mx-4 mt-2 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-mist"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 px-1">
                <ThemeToggle />
                <div className="flex flex-1 gap-2">
                  <Link href="/login" className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">Log In</Button>
                  </Link>
                  <Link href="/signup" className="flex-1">
                    <Button size="sm" className="w-full">Get Help</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
