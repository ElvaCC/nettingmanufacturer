import createMiddleware from "next-intl/middleware";
import { locales } from "./app/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export const config = {
  // 匹配 locale 路由，排除 admin 和 api
  matcher: ["/", "/(en|es|ru|ar)/:path*"],
};
