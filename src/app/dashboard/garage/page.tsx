"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";
import {
  IndianRupee, Star, Users, CheckCircle2, Clock, Power,
} from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const revenueData = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 5100 },
  { day: "Wed", revenue: 3800 },
  { day: "Thu", revenue: 6200 },
  { day: "Fri", revenue: 7400 },
  { day: "Sat", revenue: 9100 },
  { day: "Sun", revenue: 8300 },
];

const orders = [
  { id: "ORD-2291", customer: "Ramesh Patel", service: "Battery Replacement", status: "In Progress", amount: "₹1,299" },
  { id: "ORD-2288", customer: "Priya Shah", service: "Flat Tyre Repair", status: "Pending", amount: "₹399" },
  { id: "ORD-2284", customer: "Aman Verma", service: "Doorstep Servicing", status: "Completed", amount: "₹2,450" },
  { id: "ORD-2279", customer: "Sneha Rao", service: "AC Service", status: "Completed", amount: "₹1,850" },
];

const mechanics = [
  { name: "Vikram Singh", jobsToday: 4, rating: 4.9, status: "On Job" },
  { name: "Suresh Kumar", jobsToday: 2, rating: 4.7, status: "Available" },
  { name: "Farhan Ali", jobsToday: 5, rating: 4.8, status: "On Job" },
  { name: "Deepak Joshi", jobsToday: 0, rating: 4.6, status: "Offline" },
];

const statusStyle: Record<string, string> = {
  "In Progress": "text-brand bg-brand/10",
  Pending: "text-amber-500 bg-amber-500/10",
  Completed: "text-success bg-success/10",
};

const mechanicStatusStyle: Record<string, string> = {
  "On Job": "text-brand bg-brand/10",
  Available: "text-success bg-success/10",
  Offline: "text-foreground/40 bg-mist",
};

export default function GarageDashboard() {
  const [online, setOnline] = useState(true);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">Garage Overview</h1>
          <p className="mt-1 text-sm text-foreground/60">Speed Auto Works — Ahmedabad</p>
        </div>
        <button
          onClick={() => setOnline((v) => !v)}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
            online ? "bg-success/10 text-success" : "bg-mist text-foreground/50"
          }`}
        >
          <Power className="h-4 w-4" /> {online ? "Accepting Orders" : "Offline"}
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: IndianRupee, label: "Today's Earnings", value: "₹8,300" },
          { icon: CheckCircle2, label: "Orders Completed", value: "127" },
          { icon: Star, label: "Average Rating", value: "4.8" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold">{s.value}</div>
                  <div className="text-xs text-foreground/50">{s.label}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue chart */}
      <Card id="revenue">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Revenue — Last 7 days</h2>
          <Badge>This Week</Badge>
        </div>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5a1f" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#ff5a1f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "var(--background)", border: "1px solid var(--border-soft)", borderRadius: 12, fontSize: 12 }}
                formatter={(v) => [`₹${Number(v).toLocaleString()}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#ff5a1f" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Orders */}
        <Card id="orders" className="lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Real-time orders</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-foreground/40">
                  <th className="pb-3">Order</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 font-medium">{o.id}</td>
                    <td className="py-3 text-foreground/70">{o.customer}</td>
                    <td className="py-3 text-foreground/60">{o.service}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold">{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mechanics */}
        <Card id="mechanics">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Users className="h-4 w-4 text-brand" /> Mechanics
          </h2>
          <div className="mt-4 space-y-3">
            {mechanics.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-xl border border-border-soft p-3">
                <div>
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className="flex items-center gap-1 text-xs text-foreground/50">
                    <Star className="h-3 w-3 fill-brand text-brand" /> {m.rating} · {m.jobsToday} jobs today
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${mechanicStatusStyle[m.status]}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Availability */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Clock className="h-4 w-4 text-brand" /> Weekly availability
          </h2>
          <Button variant="secondary" size="sm">Edit hours</Button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
            <div key={d} className="rounded-xl border border-border-soft py-3">
              <div className="font-semibold text-foreground/70">{d}</div>
              <div className="mt-1 text-foreground/50">{i === 6 ? "Closed" : "9AM–9PM"}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
