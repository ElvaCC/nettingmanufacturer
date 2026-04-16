import createMiddleware from "next-intl/middleware";
import { locales } from "./app/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  matcher: [
    // 精确匹配首页
    "/",
    // 匹配 locale 前缀的路径
    "/(en|es|ru|ar)/:path*",
    // 排除特定路径
    "/((?!admin|api|_next|.*\\..*).*)"
  ],
};
