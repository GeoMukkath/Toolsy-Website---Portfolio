import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import BodyOfWork from "@/components/BodyOfWork";
import Philosophy from "@/components/Philosophy";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative" data-article-content>
      <Hero />
      <About />
      <Process />
      <BodyOfWork />
      <Philosophy />
      <FAQ />
      <Contact />
    </main>
  );
}
