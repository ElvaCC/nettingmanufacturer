/**
 * 全站唯一域名配置源（Single Source of Truth）
 * 正式域名统一为不带 www 的 https://nettingmanufacturer.com
 * 其他所有文件（metadata / schema / sitemap / robots / 组件）都应从这里取值，禁止再硬编码域名。
 */
export const SITE_URL = "https://nettingmanufacturer.com";

/**
 * 全站「是否允许搜索引擎收录」总开关。
 *
 * false —— 暂不对外正式发布（当前状态）：
 *   · 所有页面输出 <meta name="robots" content="noindex, nofollow">
 *   · robots.txt 屏蔽全部爬虫
 *   · sitemap.xml 返回空
 *   → 搜索引擎看不到本站；但域名照常访问，你和客户都能正常打开、正常收询盘。
 *
 * true —— 正式上线：恢复正常收录（sitemap 恢复、robots 放开、页面 index,follow）。
 *
 * 【恢复方法】把下面这行改成 true，提交部署即可。其它文件自动跟随，无需再改别处。
 * 触发条件：核心内容（成立年份/产能/认证/出口国数等）核对完成 + 询盘功能实测通过。
 */
export const SITE_INDEXABLE = false;
