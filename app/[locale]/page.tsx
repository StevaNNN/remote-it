import About from "@/app/components/sections/About";
import Contact from "@/app/components/sections/Contact";
import Header from "@/app/components/sections/Header";
import Hero from "@/app/components/sections/Hero";
import Projects from "@/app/components/sections/Projects";
import Services from "@/app/components/sections/Services";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
