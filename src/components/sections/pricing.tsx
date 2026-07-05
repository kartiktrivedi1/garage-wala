"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    desc: "For occasional roadside help.",
    features: ["Pay-per-service pricing", "24/7 emergency assistance", "Basic support"],
  },
  {
    name: "Premium",
    monthly: 149,
    yearly: 1299,
    desc: "For regular drivers who want priority.",
    features: [
      "Everything in Free",
      "Priority mechanic dispatch",
      "15% off every service",
      "Free towing up to 10km",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Business",
    monthly: 999,
    yearly: 9999,
    desc: "For fleets and businesses.",
    features: [
      "Everything in Premium",
      "Multi-vehicle fleet dashboard",
      "Dedicated account manager",
      "Monthly invoicing",
      "Custom SLAs",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Simple plans for every driver
          </h2>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border-soft bg-paper-soft p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                !yearly ? "bg-brand text-white" : "text-foreground/60"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                yearly ? "bg-brand text-white" : "text-foreground/60"
              }`}
            >
              Yearly <span className="text-xs opacity-80">(save 25%)</span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card
                className={`flex h-full flex-col ${
                  plan.highlight ? "border-brand ring-2 ring-brand/30" : ""
                }`}
              >
                {plan.highlight && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-foreground/60">{plan.desc}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-4xl font-extrabold">
                    ₹{yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="pb-1 text-sm text-foreground/50">
                    /{yearly ? "year" : "month"}
                  </span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {plan.monthly === 0 ? "Get Started" : "Choose Plan"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
