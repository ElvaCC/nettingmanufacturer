import createMiddleware from "next-intl/middleware";
import { locales } from "./app/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  // Do not emit a NEXT_LOCALE cookie. With `localePrefix: "always"` the locale is
  // fully encoded in the URL, so the cookie adds nothing functional — but any
  // Set-Cookie header makes the response uncacheable at the CDN edge, forcing a
  // full server render on every visit from overseas.
  localeCookie: false,
});

export const config = {
  // 匹配 locale 路由，排除 admin 和 api
  matcher: ["/", "/(en|es|ru|ar)/:path*"],
};
