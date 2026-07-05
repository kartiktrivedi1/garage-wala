"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
} from "recharts";
import {
  Users, Store, IndianRupee, Wrench, Tag, MoreVertical, TrendingUp, Radio,
} from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db, hasFirebaseConfig } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query, limit, Timestamp } from "firebase/firestore";

interface LiveBooking {
  id: string;
  service: string;
  customerName: string;
  status: string;
  createdAt: Timestamp | null;
}

const bookingsByMonth = [
  { month: "Feb", bookings: 820 },
  { month: "Mar", bookings: 940 },
  { month: "Apr", bookings: 1080 },
  { month: "May", bookings: 1240 },
  { month: "Jun", bookings: 1510 },
];

const serviceMix = [
  { name: "Roadside", value: 34 },
  { name: "Servicing", value: 28 },
  { name: "Tyre/Battery", value: 22 },
  { name: "Wash & Detail", value: 16 },
];
const COLORS = ["#ff5a1f", "#ff7a45", "#ffb27a", "#1b1b1e"];

const users = [
  { name: "Ramesh Patel", email: "ramesh@mail.com", role: "Customer", joined: "12 Jun 2026", status: "Active" },
  { name: "Speed Auto Works", email: "speedauto@mail.com", role: "Garage", joined: "02 Mar 2026", status: "Active" },
  { name: "Priya Shah", email: "priya@mail.com", role: "Customer", joined: "28 Jun 2026", status: "Active" },
  { name: "Metro Garage Hub", email: "metro@mail.com", role: "Garage", joined: "15 Apr 2026", status: "Suspended" },
];

const garages = [
  { name: "Speed Auto Works", city: "Ahmedabad", orders: 412, rating: 4.8, status: "Verified" },
  { name: "Metro Garage Hub", city: "Rajkot", orders: 289, rating: 4.5, status: "Verified" },
  { name: "QuickFix Motors", city: "Surat", orders: 156, rating: 4.6, status: "Pending" },
];

const coupons = [
  { code: "FIRST50", discount: "50% off", uses: "1,204 / 2,000", status: "Active" },
  { code: "MONSOON20", discount: "₹200 off", uses: "834 / 1,000", status: "Active" },
  { code: "WELCOME10", discount: "10% off", uses: "3,120 / 3,000", status: "Expired" },
];

export default function AdminDashboard() {
  const [liveBookings, setLiveBookings] = useState<LiveBooking[]>([]);

  useEffect(() => {
    if (!hasFirebaseConfig || !db) return;
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(5));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setLiveBookings(
          snap.docs.map((d) => ({
            id: d.id,
            service: d.data().service ?? "Unknown",
            customerName: d.data().customerName ?? "Customer",
            status: d.data().status ?? "pending",
            createdAt: d.data().createdAt ?? null,
          }))
        );
      },
      () => setLiveBookings([])
    );
    return () => unsub();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Platform Overview</h1>
        <p className="mt-1 text-sm text-foreground/60">Garage Wala — all regions</p>
      </div>

      {hasFirebaseConfig && (
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <Radio className="h-4 w-4 animate-pulse text-brand" /> Live bookings (Firestore)
            </h2>
            <Badge>Real-time</Badge>
          </div>
          {liveBookings.length === 0 ? (
            <p className="mt-4 text-sm text-foreground/50">
              No bookings yet — book a service from the customer dashboard and it&rsquo;ll show up here instantly.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {liveBookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-xl border border-border-soft p-3 text-sm">
                  <div>
                    <span className="font-semibold">{b.service}</span>
                    <span className="text-foreground/50"> — {b.customerName}</span>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: Users, label: "Total Users", value: "18,420" },
          { icon: Store, label: "Partner Garages", value: "1,082" },
          { icon: IndianRupee, label: "Revenue (MTD)", value: "₹42.6L" },
          { icon: Wrench, label: "Bookings (MTD)", value: "1,510" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="font-display text-lg font-extrabold">{s.value}</div>
                  <div className="text-xs text-foreground/50">{s.label}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics */}
      <div id="analytics" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <TrendingUp className="h-4 w-4 text-brand" /> Bookings growth
            </h2>
            <Badge>Last 5 months</Badge>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsByMonth}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "var(--background)", border: "1px solid var(--border-soft)", borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="bookings" fill="#ff5a1f" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-bold">Service mix</h2>
          <div className="mt-2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceMix} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {serviceMix.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "var(--background)", border: "1px solid var(--border-soft)", borderRadius: 12, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {serviceMix.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-foreground/60">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  {s.name}
                </span>
                <span className="font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Users */}
      <Card id="users">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Users className="h-4 w-4 text-brand" /> Manage users
          </h2>
          <Button variant="secondary" size="sm">Export CSV</Button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-foreground/40">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Joined</th>
                <th className="pb-3">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {users.map((u) => (
                <tr key={u.email}>
                  <td className="py-3 font-medium">{u.name}</td>
                  <td className="py-3 text-foreground/60">{u.email}</td>
                  <td className="py-3 text-foreground/60">{u.role}</td>
                  <td className="py-3 text-foreground/60">{u.joined}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      u.status === "Active" ? "bg-success/10 text-success" : "bg-red-500/10 text-red-500"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-foreground/40 hover:text-foreground"><MoreVertical className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Garages */}
        <Card id="garages">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Store className="h-4 w-4 text-brand" /> Manage garages
          </h2>
          <div className="mt-4 space-y-3">
            {garages.map((g) => (
              <div key={g.name} className="flex items-center justify-between rounded-xl border border-border-soft p-3">
                <div>
                  <div className="text-sm font-semibold">{g.name}</div>
                  <div className="text-xs text-foreground/50">{g.city} · {g.orders} orders · {g.rating}★</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  g.status === "Verified" ? "bg-success/10 text-success" : "bg-amber-500/10 text-amber-500"
                }`}>
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Coupons */}
        <Card>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Tag className="h-4 w-4 text-brand" /> Coupons
          </h2>
          <div className="mt-4 space-y-3">
            {coupons.map((c) => (
              <div key={c.code} className="flex items-center justify-between rounded-xl border border-border-soft p-3">
                <div>
                  <div className="text-sm font-semibold">{c.code}</div>
                  <div className="text-xs text-foreground/50">{c.discount} · {c.uses}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  c.status === "Active" ? "bg-success/10 text-success" : "bg-mist text-foreground/40"
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
