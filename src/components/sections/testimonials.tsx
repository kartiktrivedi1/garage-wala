"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Aditi Verma",
    role: "Daily commuter, Ahmedabad",
    rating: 5,
    quote:
      "My car battery died at 11pm on the highway. A mechanic reached in 12 minutes flat. Genuinely reassuring service.",
  },
  {
    name: "Rohan Mehta",
    role: "Garage Partner, Pune",
    rating: 5,
    quote:
      "Since joining as a partner, our bookings have tripled. The dashboard makes tracking earnings effortless.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Fleet Manager, Bengaluru",
    rating: 4,
    quote:
      "Managing 40 delivery bikes used to be a nightmare. The Business plan's fleet dashboard changed that completely.",
  },
  {
    name: "Imran Sheikh",
    role: "Bike rider, Mumbai",
    rating: 5,
    quote:
      "Flat tyre on a rainy night. Booked in seconds, got live tracking, and the mechanic was polite and quick.",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <section className="bg-paper-soft py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Loved on the road
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            What our customers say
          </h2>
        </div>

        <div className="relative mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="mx-auto max-w-2xl text-center">
                <div className="flex justify-center gap-1 text-brand">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-4 w-4 ${idx < t.rating ? "fill-brand" : "fill-transparent text-foreground/20"}`}
                    />
                  ))}
                </div>
                <p className="mt-5 font-display text-lg leading-relaxed sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <div className="font-display text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-foreground/50">{t.role}</div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === i ? "w-8 bg-brand" : "w-2 bg-mist"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((v) => (v + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft hover:border-brand hover:text-brand"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
