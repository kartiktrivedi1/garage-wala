import Link from "next/link";
import { Wrench, AtSign, Send, Share2, Globe, Apple, PlayCircle } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/partner", label: "Become a Partner" },
      { href: "/investor-relations", label: "Investor Relations" },
      { href: "/media-kit", label: "Media Kit" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/news", label: "News" },
      { href: "/support", label: "Support" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-soft bg-ink text-white">
      <div className="road-divider absolute top-0 left-0 opacity-20" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
                <Wrench className="h-4.5 w-4.5" />
              </span>
              Garage<span className="text-brand">Wala</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              One app. All vehicle solutions. On-demand roadside assistance, doorstep
              servicing, and towing — anywhere, anytime.
            </p>
            <div className="mt-6 flex gap-3">
              {[AtSign, Send, Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Garage Wala Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-xs font-medium hover:border-brand"
            >
              <Apple className="h-4 w-4" /> App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-xs font-medium hover:border-brand"
            >
              <PlayCircle className="h-4 w-4" /> Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
