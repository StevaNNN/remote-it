import { resolveLocale } from "@/app/lib/i18n/locale";
import en from "@/app/lib/i18n/en/en";
import sr from "@/app/lib/i18n/sr/sr";
import Header from "../components/sections/Header";
import Hero from '../components/sections/Hero";
import Contact from '../components/sections/Contact";
import About from '../components/sections/About";
import Projects from '../components/sections/Projects";
import Services from '../components/sections/Services";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = locale === "sr" ? sr : en;

  return (
    <main className="min-h-screen">
      <Header t={t}/>
      <Hero t={t}/>
      <Services t={t}/>
      <Projects t={t}/>
      <About t={t}/>
      <Contact t={t}/>
    </main>
  );
}
