import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { Comparison } from "@/components/Comparison";
import { MoreFeatures } from "@/components/MoreFeatures";
import { Pricing } from "@/components/Pricing";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-[#FF6B6B] selection:text-white bg-[#FFFDF7]">
      <Navbar />
      <Hero />
      <InteractiveDemo />
      <Comparison />
      <Features />
      <MoreFeatures />
      <Pricing />
      <Blog />
      <Footer />
    </main>
  );
}
