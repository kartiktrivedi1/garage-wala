"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, IndianRupee, ShieldCheck } from "lucide-react";
import { Siren, BatteryCharging, Fuel, CircleDot, Wrench, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Siren,
    title: "Emergency Roadside Assistance",
    price: "Starts at \u20b9199",
    time: "15 min avg.",
    desc: "Stuck on the highway or in the city? A verified mechanic reaches your exact location for any breakdown, day or night.",
  },
  {
    icon: BatteryCharging,
    title: "Battery Jump Start & Replacement",
    price: "Starts at \u20b9299",
    time: "20 min avg.",
    desc: "Dead battery? We jump-start on the spot or replace it with a genuine battery, backed by warranty.",
  },
  {
    icon: Fuel,
    title: "Emergency Fuel Delivery",
    price: "Starts at \u20b9149",
    time: "18 min avg.",
    desc: "Ran out of fuel mid-journey. We deliver petrol or diesel directly to your vehicle in a sealed, safe container.",
  },
  {
    icon: CircleDot,
    title: "Flat Tyre & Puncture Repair",
    price: "Starts at \u20b9249",
    time: "20 min avg.",
    desc: "On-spot puncture repair or spare-tyre fitment by a trained technician, so you're back on the road fast.",
  },
  {
    icon: Wrench,
    title: "Doorstep Vehicle Servicing",
    price: "Starts at \u20b9499",
    time: "Scheduled",
    desc: "Full servicing, oil change, AC service, and accessory installation — all at your home or office parking spot.",
  },
  {
    icon: Truck,
    title: "Towing & Vehicle Pickup",
    price: "Starts at \u20b9599",
    time: "25 min avg.",
    desc: "For issues that can't be fixed on-site, we tow your vehicle safely to the nearest partner garage.",
  },
];

export function Services() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="services" className="bg-paper-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Our services
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pick a problem. We&rsquo;ll send help.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Card
                  onClick={() => setSelected(i)}
                  className="group h-full cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60">{s.desc}</p>
                  <div className="mt-5 flex items-center justify-between text-xs font-semibold text-foreground/50">
                    <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{s.price.replace("Starts at \u20b9", "")}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{s.time}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-md rounded-3xl bg-background p-8"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full hover:bg-mist"
              >
                <X className="h-4 w-4" />
              </button>
              {(() => {
                const s = services[selected];
                const Icon = s.icon;
                return (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-extrabold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/65">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-6 text-sm">
                      <span className="flex items-center gap-1.5 font-semibold text-brand">
                        <IndianRupee className="h-4 w-4" /> {s.price.replace("Starts at \u20b9", "")}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/60">
                        <Clock className="h-4 w-4" /> {s.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/60">
                        <ShieldCheck className="h-4 w-4" /> Verified
                      </span>
                    </div>
                    <Button className="mt-8 w-full">Book This Service</Button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
