"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-paper-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Get in touch
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            We&rsquo;re here, whenever you need us
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                <Card className="flex flex-col items-center gap-2 py-6 text-center transition-transform hover:-translate-y-1">
                  <MessageCircle className="h-6 w-6 text-success" />
                  <span className="text-xs font-semibold">WhatsApp</span>
                </Card>
              </a>
              <a href="tel:+919999999999">
                <Card className="flex flex-col items-center gap-2 py-6 text-center transition-transform hover:-translate-y-1">
                  <Phone className="h-6 w-6 text-brand" />
                  <span className="text-xs font-semibold">Call Us</span>
                </Card>
              </a>
              <a href="mailto:support@garagewala.app">
                <Card className="flex flex-col items-center gap-2 py-6 text-center transition-transform hover:-translate-y-1">
                  <Mail className="h-6 w-6 text-foreground/70" />
                  <span className="text-xs font-semibold">Email</span>
                </Card>
              </a>
            </div>

            <Card className="overflow-hidden p-0">
              <iframe
                title="Garage Wala location"
                src="https://www.google.com/maps?q=Ahmedabad,Gujarat,India&output=embed"
                className="h-72 w-full grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>

          <Card>
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <Send className="h-10 w-10 text-brand" />
                <h3 className="mt-4 font-display text-lg font-bold">Message sent</h3>
                <p className="mt-2 text-sm text-foreground/60">
                  We&rsquo;ll get back to you within a few hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                <h3 className="font-display text-lg font-bold">Send us a message</h3>
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea rows={4} placeholder="How can we help?" required />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
