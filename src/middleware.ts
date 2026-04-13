import createMiddleware from "next-intl/middleware";
import { locales } from "./app/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|es|ru|ar)/:path*"],
};
