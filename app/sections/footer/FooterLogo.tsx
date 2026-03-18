"use client";

import { FC } from "react";
import Image from "next/image";
import LogoBig from "@/app/resources/logo-big.svg";
import Logo from "@/app/resources/logo.svg";
import useBreakpoint from "@/app/hooks/useBreakpoint";
import { LocaleDictionary } from "@/app/lib/i18n/types";

const FooterLogo: FC<{ t: LocaleDictionary }> = ({ t }) => {
  const { isMobile } = useBreakpoint();
  return <Image src={isMobile ? LogoBig : Logo} alt={t.header.logo} />;
};

export default FooterLogo;
