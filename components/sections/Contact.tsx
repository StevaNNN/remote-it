"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components//ui/label";
import { toast } from "sonner";
import { Phone, Building2, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const tf = useTranslations("footer");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success(t("form.success"));
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(t("form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
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

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("info.phone")}</h3>
                  <a
                    href="tel:+381603668619"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +381 60 366 8619
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-lg bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("info.companyId")}</h3>
                  <p className="text-muted-foreground">123123122</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-lg bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("info.pib")}</h3>
                  <p className="text-muted-foreground">123123</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("form.fullName")}</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="bg-background resize-none"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t("form.sending") : t("form.send")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            {tf("rights")}
          </p>
        </div>
      </footer>
    </section>
  );
}
