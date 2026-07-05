"use client";

import { motion } from "framer-motion";
import {
  Siren, Wrench, BatteryCharging, Fuel, CircleDot, Car, Bike,
  Droplets, Wind, Truck, Settings2, Package, Zap, AlertTriangle,
  Gauge, Building2, CalendarClock,
} from "lucide-react";

const features = [
  { icon: Siren, label: "Emergency Roadside Assistance" },
  { icon: Wrench, label: "Doorstep Mechanic" },
  { icon: BatteryCharging, label: "Battery Replacement" },
  { icon: Fuel, label: "Fuel Delivery" },
  { icon: CircleDot, label: "Tyre Repair" },
  { icon: Car, label: "Car Wash" },
  { icon: Bike, label: "Bike Wash" },
  { icon: Droplets, label: "Engine Oil Change" },
  { icon: Wind, label: "AC Service" },
  { icon: Truck, label: "Vehicle Pickup" },
  { icon: Truck, label: "Towing" },
  { icon: Settings2, label: "Vehicle Servicing" },
  { icon: Package, label: "Accessories Installation" },
  { icon: Zap, label: "Jump Start" },
  { icon: AlertTriangle, label: "Flat Tyre" },
  { icon: Gauge, label: "Emergency Fuel" },
  { icon: Building2, label: "Fleet Services" },
  { icon: CalendarClock, label: "Scheduled Service" },
];

export function Features() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Everything, on demand
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            18 ways we keep you moving
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border-soft bg-paper-soft px-3 py-6 text-center transition-colors duration-300 hover:border-brand/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-foreground/60 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_24px_rgba(255,90,31,0.5)]">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium leading-tight text-foreground/75 sm:text-[13px]">
                  {f.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
