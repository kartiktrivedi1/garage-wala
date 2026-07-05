"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BatteryCharging, Fuel, CircleDot, Wrench, Truck, MapPin,
  Download, CreditCard, Bell, Star, CheckCircle2, Loader2,
} from "lucide-react";
import { Card, Badge } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { db, hasFirebaseConfig } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const quickServices = [
  { icon: BatteryCharging, label: "Battery" },
  { icon: CircleDot, label: "Tyre" },
  { icon: Fuel, label: "Fuel" },
  { icon: Truck, label: "Towing" },
  { icon: Wrench, label: "Service" },
];

const invoices = [
  { id: "INV-1042", service: "Battery Replacement", date: "28 Jun 2026", amount: "₹1,299", status: "Paid" },
  { id: "INV-1038", service: "Doorstep Servicing", date: "14 Jun 2026", amount: "₹2,450", status: "Paid" },
  { id: "INV-1027", service: "Flat Tyre Repair", date: "02 Jun 2026", amount: "₹399", status: "Paid" },
];

const notifications = [
  { text: "Your mechanic Vikram is 8 minutes away.", time: "2 min ago" },
  { text: "Invoice INV-1042 has been generated.", time: "3 days ago" },
  { text: "15% Premium discount applied to your last service.", time: "1 week ago" },
];

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookingLabel, setBookingLabel] = useState<string | null>(null);
  const [justBooked, setJustBooked] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  async function handleBook(label: string) {
    setBookingError(null);
    setJustBooked(null);
    if (!hasFirebaseConfig || !db) {
      setBookingError("Firebase isn't configured — add your keys to .env.local to enable real bookings.");
      return;
    }
    setBookingLabel(label);
    try {
      await addDoc(collection(db, "bookings"), {
        service: label,
        customerId: user?.uid ?? "demo-user",
        customerName: user?.name ?? "Demo Customer",
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setJustBooked(label);
    } catch {
      setBookingError("Couldn't create the booking. Check your Firestore rules allow writes.");
    } finally {
      setBookingLabel(null);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-extrabold">Overview</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Here&rsquo;s what&rsquo;s happening with your vehicle assistance.
        </p>
      </div>

      {justBooked && (
        <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
          Request sent for <strong>{justBooked}</strong> — a nearby garage will accept it shortly. This booking is now saved in Firestore.
        </div>
      )}
      {bookingError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {bookingError}
        </div>
      )}

      {/* Active tracking */}
      <Card id="track" className="border-brand/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge>Live</Badge>
            <h2 className="mt-3 font-display text-lg font-bold">Mechanic en route</h2>
            <p className="mt-1 text-sm text-foreground/60">
              Vikram Singh is heading to your location for Battery Replacement.
            </p>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl font-extrabold text-brand">8 min</div>
            <div className="text-xs text-foreground/50">estimated arrival</div>
          </div>
        </div>
        <div className="mt-6 flex h-40 items-center justify-center rounded-2xl bg-mist text-foreground/40">
          <MapPin className="h-6 w-6" />
          <span className="ml-2 text-sm">Live map view</span>
        </div>
      </Card>

      {/* Quick book */}
      <div id="book">
        <h2 className="font-display text-lg font-bold">Book a service</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {quickServices.map((s, i) => {
            const Icon = s.icon;
            const isLoading = bookingLabel === s.label;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  onClick={() => !bookingLabel && handleBook(s.label)}
                  className="flex cursor-pointer flex-col items-center gap-3 py-6 text-center transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className="text-sm font-semibold">{s.label}</span>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Invoices */}
        <Card id="invoices" className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Recent invoices</h2>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-foreground/40">
                  <th className="pb-3">Invoice</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="py-3 font-medium">{inv.id}</td>
                    <td className="py-3 text-foreground/60">{inv.service}</td>
                    <td className="py-3 text-foreground/60">{inv.date}</td>
                    <td className="py-3 font-semibold">{inv.amount}</td>
                    <td className="py-3 text-right">
                      <button className="inline-flex items-center gap-1 text-xs font-semibold text-brand">
                        <Download className="h-3.5 w-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Notifications */}
        <Card id="notifications">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Bell className="h-4 w-4 text-brand" /> Notifications
          </h2>
          <div className="mt-4 space-y-4">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <div>
                  <p className="text-foreground/80">{n.text}</p>
                  <p className="mt-0.5 text-xs text-foreground/40">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Payments */}
      <Card id="payments">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <CreditCard className="h-4 w-4 text-brand" /> Payment methods
          </h2>
          <Button variant="secondary" size="sm">Add Method</Button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl border border-border-soft p-4">
            <div>
              <div className="text-sm font-semibold">UPI — user@okhdfc</div>
              <div className="text-xs text-foreground/50">Default payment method</div>
            </div>
            <Star className="h-4 w-4 fill-brand text-brand" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border-soft p-4">
            <div>
              <div className="text-sm font-semibold">Visa •••• 4242</div>
              <div className="text-xs text-foreground/50">Expires 08/28</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
