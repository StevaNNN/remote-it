"use client";

import { useCallback, useEffect, useState } from "react";

const HEADER_HEIGHT = 140;
const SECTION_RATIO = 1.5; // smaller ratio flags in-view sooner

const toSlug = (item: string) => item.toLowerCase().replaceAll(" ", "-");

const isSectionInView = (el: HTMLElement): boolean => {
  const threshold =
    window.innerHeight - window.innerHeight / SECTION_RATIO + HEADER_HEIGHT;
  return el.getBoundingClientRect().top <= threshold;
};

export const useActiveSection = (navItems: string[]) => {
  const [activeHash, setActiveHash] = useState("");
  const sectionIds = navItems.map(toSlug);

  useEffect(() => {
    const onScroll = () => {
      let activeId = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);

        if (!el) continue;

        if (isSectionInView(el)) {
          el.classList.add("in-view");
          activeId = id;
        } else {
          el.classList.remove("in-view");
        }
      }

      setActiveHash(activeId);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback((slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveHash(slug);
  }, []);

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveHash("");
  }, []);

  return { activeHash, scrollToSection, scrollToTop } as const;
};
