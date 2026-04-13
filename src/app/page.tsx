import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CascadeSection } from "@/components/CascadeSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CascadeSection />
      </main>
      <Footer />
    </>
  );
}
