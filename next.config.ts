import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  path.join(process.cwd(), "src/i18n/request"),
);

export default withNextIntl({});
