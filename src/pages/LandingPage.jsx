import Hero from "@/components/custom/LandingPage/Hero";
import Features from "@/components/custom/LandingPage/Features";
import Developers from "@/components/custom/LandingPage/Developers";
import CallToAction from "@/components/custom/LandingPage/CallToAction";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      <Developers />
      <CallToAction />
    </div>
  );
}
