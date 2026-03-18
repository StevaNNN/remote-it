"use client";

import { FC } from "react";
import Image from "next/image";
import useBreakpoint from "@/app/hooks/useBreakpoint";
import { LocaleDictionary } from "@/app/lib/i18n/types";

const FooterLogo: FC<{ t: LocaleDictionary }> = ({ t }) => {
  const { isMobile } = useBreakpoint();
  return <Image src={isMobile ? "/logo-big.svg" : "/logo.svg"} alt={t.header.logo} />;
};

export default FooterLogo;
