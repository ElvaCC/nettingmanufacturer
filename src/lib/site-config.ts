/**
 * 全站唯一域名配置源（Single Source of Truth）
 * 正式域名统一为不带 www 的 https://nettingmanufacturer.com
 * 其他所有文件（metadata / schema / sitemap / robots / 组件）都应从这里取值，禁止再硬编码域名。
 */
export const SITE_URL = "https://nettingmanufacturer.com";
