"use client";

import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { FC, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routes } from "../routes";
import Text from "./Text";
import Icon from "./Icon";
import Sidemenu from "./Sidemenu";
import { Locale } from "../lib/i18n/locale";
import { LocaleDictionary } from "../lib/i18n/types";

export interface HeaderProps {
  locale: Locale;
  t: LocaleDictionary;
}

export type SidemenuState = "closed" | "open" | "closing";

const toSlug = (item: string) => item.toLowerCase().replaceAll(" ", "-");
const SIDEMENU_ANIMATION_MS = 350;

const Header: FC<HeaderProps> = ({ locale, t }) => {
  const [sidemenuState, setSidemenuState] = useState<SidemenuState>("closed");
  const [activeHash, setActiveHash] = useState("");
  const closeTimerRef = useRef<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navItems = t.header.nav.slice(0, 6);
  const isSidemenuOpen = sidemenuState === "open";
  const isSidemenuVisible = sidemenuState !== "closed";
  const isSidemenuClosing = sidemenuState === "closing";

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash.replace("#", ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sidemenuState !== "closed") {
        setSidemenuState("closed");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidemenuState]);

  const handleLocaleChange = (event: any) => {
    const nextLocale = event.target.value as Locale;
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    const params = new URLSearchParams(searchParams.toString());
    params.set("locale", nextLocale);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleOpenSideMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setSidemenuState("open");
  };

  const handleCloseSideMenu = () => {
    if (sidemenuState === "closed" || sidemenuState === "closing") {
      return;
    }

    setSidemenuState("closing");
    closeTimerRef.current = window.setTimeout(() => {
      setSidemenuState("closed");
      closeTimerRef.current = null;
    }, SIDEMENU_ANIMATION_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isSidemenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseSideMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidemenuOpen]);

  return (
    <>
      <header className="p-header h-box align-items-center">
        <div className="p-header__left justify-content-start h-box">
          <Logo ariaLabel={t.header.logo} />
        </div>

        <nav
          className="p-header__nav h-box align-items-center justify-content-center"
          aria-label={t.header.navBar}
        >
          {navItems.map((item) => {
            const slug = toSlug(item);
            return (
              <Link
                key={item}
                href={`/#${slug}`}
                className={`h-box align-items-center justify-content-center p-header__nav-link${activeHash === slug ? " active" : ""}`}
                onClick={() => setActiveHash(slug)}
              >
                <Text htmlElement="span">{item}</Text>
              </Link>
            );
          })}
        </nav>

        <div className="p-header__right h-box align-items-center justify-content-end">
          <div className="p-header__lang">
            <label className="sr-only" htmlFor="locale-select">
              {t.header.selectLabel}
            </label>
            <select
              id="locale-select"
              className="p-header__lang-select"
              value={locale}
              onChange={handleLocaleChange}
              aria-label={t.header.selectLabel}
            >
              <option value="en">{t.header.localeOption1}</option>
              <option value="sr">{t.header.localeOption2}</option>
            </select>
          </div>
          <Button
            href={routes.contact}
            size="sm"
            variant="outline"
            className="animate-button"
          >
            <Text htmlElement="span">{t.header.contact}</Text>
            <Icon name="arrow-right" width={20} height={20} />
          </Button>
          <button
            type="button"
            className="p-ham-nav h-box align-items-center justify-content-center"
            aria-label="Open menu"
            aria-expanded={isSidemenuOpen}
            onClick={handleOpenSideMenu}
          >
            <Icon name="ham-menu" />
          </button>
        </div>
      </header>

      {isSidemenuVisible && (
        <Sidemenu
          items={navItems}
          activeHash={activeHash}
          onActiveChange={setActiveHash}
          isClosing={isSidemenuClosing}
          t={{ header: { logo: t.header.logo } }}
          onClose={handleCloseSideMenu}
        />
      )}
    </>
  );
};

export default Header;
