"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Users, TrendingUp, Radio, Wallet, LayoutDashboard, Zap, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { db, hasFirebaseConfig } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const benefits = [
  { icon: Users, title: "More Customers", desc: "Tap into thousands of nearby vehicle owners." },
  { icon: TrendingUp, title: "Business Growth", desc: "Grow revenue with steady demand, off-peak too." },
  { icon: Radio, title: "Real-Time Orders", desc: "Instant alerts the moment a request comes in." },
  { icon: Wallet, title: "Daily Earnings", desc: "Track payouts and settlements every single day." },
  { icon: LayoutDashboard, title: "Performance Dashboard", desc: "Ratings, revenue, and mechanic activity in one view." },
  { icon: Zap, title: "Instant Payments", desc: "Get paid straight to your account, no delays." },
];

const schema = z.object({
  garageName: z.string().min(2, "Enter your garage name"),
  ownerName: z.string().min(2, "Enter owner name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  city: z.string().min(2, "Enter your city"),
});
type FormValues = z.infer<typeof schema>;

export function GaragePartner() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    if (hasFirebaseConfig && db) {
      await addDoc(collection(db, "garages"), {
        ...values,
        status: "pending",
        createdAt: serverTimestamp(),
      });
    }
    setSubmitted(true);
    reset();
  }

  return (
    <section id="partner" className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              For garage owners
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Grow your garage with Garage Wala
            </h2>
            <p className="mt-4 max-w-md text-white/60">
              Join 1,000+ partner garages already getting steady, real-time bookings from
              customers around them.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <Icon className="h-5 w-5 text-brand" />
                    <h4 className="mt-3 font-display text-sm font-bold">{b.title}</h4>
                    <p className="mt-1 text-xs text-white/50">{b.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Card className="border-white/10 bg-white/5 text-white">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-12 w-12 text-brand" />
                <h3 className="mt-4 font-display text-xl font-bold">Application received!</h3>
                <p className="mt-2 max-w-xs text-sm text-white/60">
                  Our partnerships team will call you within 24 hours to complete onboarding.
                </p>
                <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>
                  Submit another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="font-display text-xl font-bold">Partner Registration</h3>
                {!hasFirebaseConfig && (
                  <p className="rounded-xl bg-brand/10 px-4 py-2 text-xs text-brand">
                    Demo mode — add Firebase keys in .env.local to save real applications.
                  </p>
                )}
                <div>
                  <Label className="text-white/70">Garage Name</Label>
                  <Input placeholder="Sharma Auto Works" {...register("garageName")} />
                  {errors.garageName && (
                    <p className="mt-1 text-xs text-brand">{errors.garageName.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-white/70">Owner Name</Label>
                  <Input placeholder="Ramesh Sharma" {...register("ownerName")} />
                  {errors.ownerName && (
                    <p className="mt-1 text-xs text-brand">{errors.ownerName.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/70">Phone</Label>
                    <Input placeholder="98765 43210" {...register("phone")} />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-brand">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white/70">City</Label>
                    <Input placeholder="Ahmedabad" {...register("city")} />
                    {errors.city && (
                      <p className="mt-1 text-xs text-brand">{errors.city.message}</p>
                    )}
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Apply to Partner"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
