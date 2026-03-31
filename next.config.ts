// next.config.ts
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin("./src/i18n/request");
export default withNextIntl(nextConfig);
