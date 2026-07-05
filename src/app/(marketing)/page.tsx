import { Hero } from "@/components/sections/hero";
import { LiveDemo } from "@/components/sections/live-demo";
import { Features } from "@/components/sections/features";
import { Services } from "@/components/sections/services";
import { GaragePartner } from "@/components/sections/garage-partner";
import { HowItWorks } from "@/components/sections/how-it-works";
import { AppShowcase } from "@/components/sections/app-showcase";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveDemo />
      <Features />
      <Services />
      <GaragePartner />
      <HowItWorks />
      <AppShowcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
