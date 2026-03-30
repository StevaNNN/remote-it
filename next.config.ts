import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  path.resolve(process.cwd(), "i18n/request.ts"),
);

export default withNextIntl({});
