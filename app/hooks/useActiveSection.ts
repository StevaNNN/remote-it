"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const HEADER_HEIGHT = 140;

const toSlug = (item: string) => item.toLowerCase().replaceAll(" ", "-");

const isSectionVisible = (el: HTMLElement): boolean => {
  const { top, bottom } = el.getBoundingClientRect();
  const viewTop = HEADER_HEIGHT;
  const viewBottom = window.innerHeight;
  return bottom > viewTop && top < viewBottom;
};

export const useActiveSection = (navItems: string[], locale: string) => {
  const [activeHash, setActiveHash] = useState("");
  const sectionIds = navItems.map(toSlug);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const allIds = [...sectionIds, "counter"];

    const onScroll = () => {
      let activeId = "";

      for (const id of allIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (isSectionVisible(el)) {
          el.classList.add("in-view");
          if (sectionIds.includes(id)) activeId = id;
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

  const scrollToTop = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (pathname === `/${locale}`) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(`/${locale}`);
      }
      setActiveHash("");
    },
    [pathname, locale, router],
  );

  return { activeHash, scrollToSection, scrollToTop } as const;
};
