"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hand, Radio, CheckCircle2, Navigation, MapPinned, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  { icon: Hand, title: "Customer Taps", desc: "\u201cNeed Help\u201d" },
  { icon: Radio, title: "Request Broadcast", desc: "Nearby garages notified instantly" },
  { icon: CheckCircle2, title: "Garage Accepts", desc: "Closest available mechanic assigned" },
  { icon: Navigation, title: "Mechanic Starts Journey", desc: "En route to your location" },
  { icon: MapPinned, title: "Live Location", desc: "Track arrival in real time" },
  { icon: Sparkles, title: "Repair Completed", desc: "Pay in-app, rate your mechanic" },
];

export function LiveDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-paper-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            See it in action
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            From tap to repair, in minutes
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="road-divider absolute -top-6 left-0 hidden lg:block" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === i;
            return (
              <Card
                key={step.title}
                className={`relative overflow-hidden transition-all duration-500 ${
                  isActive ? "scale-[1.02] border-brand/50" : "opacity-70"
                }`}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent"
                    />
                  )}
                </AnimatePresence>
                <div className="relative flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 ${
                      isActive ? "bg-brand text-white" : "bg-mist text-foreground/50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-xs font-semibold uppercase tracking-wider text-brand">
                      Step {i + 1}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm text-foreground/60">{step.desc}</p>
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="demo-progress"
                    className="absolute bottom-0 left-0 h-1 w-full origin-left bg-brand"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2.2, ease: "linear" }}
                  />
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
