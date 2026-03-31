"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { FC, useRef } from "react";
import { Code as Code2, Palette, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

const expertise = [
  {
    id: "frontend",
    icon: Code2,
  },
  {
    id: "designSystems",
    icon: Palette,
  },
  {
    id: "accessibility",
    icon: Eye,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

const About: FC = () => {
  const t = useTranslations("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{t("whoWeAre")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("whoWeAreText")}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{t("whatWeDo")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("whatWeDoText")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-center">
              {t("expertise.title")}
            </h3>

            <motion.div
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {expertise.map((exp) => {
                const Icon = exp.icon;
                return (
                  <motion.div
                    key={exp.id}
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <h4 className="text-lg font-semibold mb-2">
                      {t(`expertise.${exp.id}`)}
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      {t(`expertise.${exp.id}Desc`)}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
