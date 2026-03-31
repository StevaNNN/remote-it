"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  const handleScrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const offset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent">
              {t("title")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={handleScrollToServices}
              className="text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("cta")}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={handleScrollToServices}
          className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground transition-colors group"
          aria-label={t("scrollDown")}
        >
          <span className="text-sm font-medium">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
