import createMiddleware from "next-intl/middleware";
import { locales } from "./app/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  matcher: [
    // 排除 /admin 和 /api 路径
    "/((?!admin|api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    // locale 路由
    "/(en|es|ru|ar)/:path*"
  ],
};
