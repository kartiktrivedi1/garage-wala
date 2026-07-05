import { Accordion } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast can a mechanic reach me?",
    a: "Our average response time is 15 minutes in serviceable cities, depending on your location and mechanic availability nearby.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support UPI, credit/debit cards, net banking, and popular wallets through Razorpay and PhonePe integrations.",
  },
  {
    q: "Can I track my mechanic in real time?",
    a: "Yes — once a garage accepts your request, you'll see live GPS tracking of the mechanic's journey to your location.",
  },
  {
    q: "How do I become a garage partner?",
    a: "Fill out the partner registration form on this page or visit the Partner page. Our team verifies and onboards you within 24-48 hours.",
  },
  {
    q: "Is there a subscription required to use Garage Wala?",
    a: "No, the Free plan lets you pay per service. Premium and Business plans add discounts, priority dispatch, and fleet tools.",
  },
  {
    q: "What if my vehicle can't be fixed on the spot?",
    a: "We'll arrange towing to the nearest trusted partner garage and keep you updated throughout the process.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-14">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
