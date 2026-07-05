"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Battery, Wifi, Wrench, Star, Clock } from "lucide-react";

const screens = [
  {
    title: "Track Your Mechanic",
    accent: "Live tracking",
    body: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-xl bg-brand/10 p-3 text-brand">
          <MapPin className="h-4 w-4" /> <span className="text-xs font-semibold">Arriving in 8 min</span>
        </div>
        <div className="h-28 rounded-xl bg-mist" />
        <div className="rounded-xl border border-border-soft p-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-brand/20" />
            <div>
              <div className="text-xs font-bold">Vikram Singh</div>
              <div className="text-[10px] text-foreground/50">Senior Mechanic • 4.9 ★</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Book a Service",
    accent: "One-tap booking",
    body: (
      <div className="grid grid-cols-2 gap-2">
        {["Battery", "Tyre", "Fuel", "Towing"].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 rounded-xl border border-border-soft p-3">
            <Wrench className="h-4 w-4 text-brand" />
            <span className="text-[10px] font-semibold">{s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Rate Your Experience",
    accent: "Reviews & ratings",
    body: (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <div className="flex gap-1 text-brand">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-brand" />
          ))}
        </div>
        <p className="text-xs text-foreground/60">&ldquo;Fixed my flat tyre in 15 minutes!&rdquo;</p>
      </div>
    ),
  },
];

export function AppShowcase() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % screens.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Inside the app
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built for calm in a stressful moment
            </h2>
            <p className="mt-4 max-w-md text-foreground/60">
              Every screen is designed to get you help fast — clear status, live tracking, and
              transparent pricing, no confusion.
            </p>
            <div className="mt-8 flex gap-2">
              {screens.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    active === i ? "w-10 bg-brand" : "w-4 bg-mist"
                  }`}
                  aria-label={s.title}
                />
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex h-[560px] w-[280px] items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-brand/20 blur-[80px]" />
            <div className="glass relative h-[560px] w-[280px] rounded-[2.75rem] border-4 border-white/40 p-3 shadow-2xl">
              <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-ink/80" />
              <div className="flex h-full flex-col rounded-[2.2rem] bg-background p-5 pt-8">
                <div className="mb-4 flex items-center justify-between text-[10px] text-foreground/50">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3" /> <Battery className="h-3 w-3" />
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                      {screens[active].accent}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold">{screens[active].title}</h3>
                    <div className="mt-4">{screens[active].body}</div>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-mist py-2 text-[10px] text-foreground/50">
                  <Clock className="h-3 w-3" /> Updated just now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
