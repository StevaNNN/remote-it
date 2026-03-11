"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SidemenuState = "closed" | "open" | "closing";

const SIDEMENU_ANIMATION_MS = 350;
const BREAKPOINT = 768;

export const useSidemenu = () => {
  const [state, setState] = useState<SidemenuState>("closed");
  const closeTimerRef = useRef<number | null>(null);

  const isOpen = state === "open";
  const isVisible = state !== "closed";
  const isClosing = state === "closing";

  const open = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setState("open");
  }, []);

  const close = useCallback(() => {
    setState((prev) => {
      if (prev === "closed" || prev === "closing") return prev;
      closeTimerRef.current = window.setTimeout(() => {
        setState("closed");
        closeTimerRef.current = null;
      }, SIDEMENU_ANIMATION_MS);
      return "closing";
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > BREAKPOINT && state !== "closed") {
        setState("closed");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [state]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  return { isOpen, isVisible, isClosing, open, close } as const;
};
