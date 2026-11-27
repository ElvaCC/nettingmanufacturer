# 网站图片上传长期执行指令（GPT × Gemini 两轮互评后定稿）

适用：nettingmanufacturer.com（B2B HDPE 经编网出口站，Next.js 14 App Router，EN/ES/RU/AR，客户为海外进口商/批发商/经销商，不做零售）。当前 SITE_INDEXABLE=false。

## 一、目录与命名

1. 产品图存 `public/products/`，应用图存 `public/applications/`，工厂图沿用现有目录，不新建重复目录、不重构目录结构。
2. 文件名：英文小写 + 连字符，须包含**产品实体 + 画面场景**（如 `hdpe-debris-netting-scaffolding.webp`、`hdpe-shade-net-greenhouse.webp`）；禁 IMG/DSC/001 等相机或序号名；不堆关键词；不把未核实的 GSM/网孔/UV/遮光率写进名字。
3. 上传操作（与命名规则分开）：上传前查重，禁止未经确认覆盖已有文件，保留原图。

## 二、四语言 Alt 与 Caption

4. 每张有意义的图维护 `{ en, es, ru, ar }` 的 Alt；Caption 只在有说明价值时给，可不给。按当前 locale 渲染，禁止四语混排或留空；缺失时英文可临时兜底，但不算完成交付。
5. Alt = 核心产品实体 + 画面实际内容（如 `HDPE debris netting installed on construction scaffolding`），80–125 字符，不堆关键词，不与页面标题重复。
6. Caption = 补充应用背景与可确认的产品事实，不重复 Alt；可以有一句克制的 B2B 适配说明（批量供货/工程适配），但**每张图都不加销售 CTA**，询盘入口放在模块层级。
7. 装饰图 `alt=""`；不允许所有图共用同一 Alt；阿拉伯语页面正常 RTL，禁止给实拍图做镜像（铭牌、标签会变反字）。

## 三、真实性（唯一的硬红线）

8. 严禁编造或推断任何未核实的信息：GSM、网孔、UV%、Mono/Tape、遮光率、纱线类型、阻燃、认证、材质、价格、库存、SKU、交期。
9. 若该批次参数已在产品资料或公司档案中确认、且与页面正文一致，才可写入 Caption 或正文；否则只写画面与场景可确认的内容。
10. 不用 AI 生成图冒充工厂实拍；不改动实际产品的网孔结构、颜色、外观；裁剪压缩不得改变产品观感。

## 四、HTML 与性能

11. 有独立内容意义且需要说明的图用 `figure + figcaption`（figcaption 必须可见，不得 CSS 隐藏）；卡片缩略图、装饰图不用，不制造重复文字。
12. 用现有 `next/image`；必须有明确宽高或宽高比防 CLS。`sizes` 分档：`fill` 响应式图必填；`width+height` 靠 CSS 缩放按布局给；固定尺寸小图可不设。禁止为凑"必填"乱填 100vw。
13. 只有真正的首屏 LCP 图加 `priority`；首屏关键图不得 lazy；其余依赖 next/image 默认懒加载即可，不必逐张手写 `loading="lazy"`；禁止全页 priority，禁止改 Next 版本或图片架构。
14. 禁 canvas / CSS background-image / base64 承载有 SEO 意义的内容图；装饰背景、图标、分隔线不受此限。

## 五、结构化数据

15. Product Schema 采用条件式：页面确实对应一个明确产品实体、且内容与标记一致时才输出；品类页/应用介绍页不硬套 Product。
16. `image` 用本产品真实图片的干净 HTTPS 绝对 URL（无查询参数、非 `/_next/image?...`），不塞工厂图或他人产品图；不编造 Offer/价格/库存/SKU；不重复建 Schema；不为普通图片逐张创建 ImageObject。

## 六、验收（分两档，避免把上传变成全站审计）

17. 首次建立规则、或改动图片组件时：完整检查四语言渲染、桌面与移动端、console、全部图片属性、Schema 字段。
18. 日常批量上传：全部图片查 HTTP 200 与是否正常显示；Alt、语言渲染、移动端布局按代表页抽检；确认无意外覆盖。
19. 交付证据：修改文件清单、图片尺寸/格式/大小、四语言 Alt/Caption 核对结果、本地预览 URL、渲染后 HTML 中的 img/src/alt/width/height/loading 与 figure/figcaption、图片 200 与 404 检查、console 错误；详细证据给 EN + AR（AR 兼验 RTL），但检查范围仍是四语言。
20. 点击放大属可选体验优化，不列入 SEO 验收项；原图不清晰时不假装放大能创造细节。

## 七、边界

21. 当前 `SITE_INDEXABLE=false`：严禁改 robots、noindex、sitemap、canonical、hreflang 或任何全站 SEO 配置，严禁 push、部署、发布。
22. 只改本任务必需的文件，不借图片优化重构组件、改 URL、升依赖、动无关页面。
23. 图片须与所在页面主题一致，周边有准确的文字说明；无法验证的项目如实说明，不得声称完成。
