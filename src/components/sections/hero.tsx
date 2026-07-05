"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroScene = dynamic(() => import("@/components/three/hero-scene").then((m) => m.HeroScene), {
  ssr: false,
});

const stats = [
  { value: "1000+", label: "Partner Garages" },
  { value: "24/7", label: "Emergency Support" },
  { value: "15 Min", label: "Average Response" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink text-white">
      {/* Ambient liquid gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-glow/15 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <HeroScene />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 backdrop-blur"
          >
            <MapPin className="h-3.5 w-3.5 text-brand" /> Live in 40+ cities across India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.6rem]"
          >
            Vehicle Broke Down?
            <br />
            <span className="text-gradient-brand">We&rsquo;ll Reach You</span>
            <br />
            Anywhere.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg text-white/60"
          >
            One tap connects you to the nearest trusted mechanic — battery, tyre, fuel,
            towing, or a full doorstep service. Garage Wala brings the garage to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Assistance <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/partner">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Become Garage Partner
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-extrabold text-brand sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-float text-white/30">
        <div className="h-9 w-5 rounded-full border border-white/25 p-1">
          <div className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-brand" />
        </div>
      </div>
    </section>
  );
}
