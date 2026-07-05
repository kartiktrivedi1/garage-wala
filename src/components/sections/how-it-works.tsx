"use client";

import { motion } from "framer-motion";
import { Smartphone, MapPin, ThumbsUp, Wrench, PartyPopper } from "lucide-react";

const timeline = [
  { icon: Smartphone, title: "Open App", desc: "Launch Garage Wala and describe your issue." },
  { icon: MapPin, title: "Share Location", desc: "We pinpoint you and find the nearest garages." },
  { icon: ThumbsUp, title: "Garage Accepts", desc: "The closest available partner takes your request." },
  { icon: Wrench, title: "Mechanic Arrives", desc: "Track your mechanic live, right to your doorstep." },
  { icon: PartyPopper, title: "Vehicle Fixed", desc: "Pay in-app and rate your experience." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            How it works
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Five steps between you and back on the road
          </h2>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border-soft sm:block lg:left-1/2" />
          <div className="space-y-12 lg:space-y-0">
            {timeline.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`relative flex items-center gap-6 lg:grid lg:grid-cols-2 lg:gap-16 ${
                    i > 0 ? "lg:mt-4" : ""
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className={`${isEven ? "lg:order-1 lg:text-right" : "lg:order-2"} flex-1`}
                  >
                    <div
                      className={`flex items-center gap-4 lg:${isEven ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-[0_8px_24px_-6px_rgba(255,90,31,0.5)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-display text-xs font-semibold uppercase tracking-wider text-brand">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className="font-display text-xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-foreground/60 lg:ml-[72px]">{step.desc}</p>
                  </motion.div>
                  <div className="hidden lg:order-1 lg:block" />
                  <div className="absolute left-6 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-brand ring-4 ring-brand/20 sm:block lg:left-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
