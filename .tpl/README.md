# Quiver · AI 智能体工作室

## 能力与限制

React、Next.js、TypeScript 与现有 framer-motion 构建的 27 页双语整站。首屏和页尾为原生 WebGL 实时光照；统计照片为二维 Canvas 放大镜；包含铭牌、取景、展台、平面图、滚动智能体、案例簿、手记、价格通行证、分类 FAQ、四步预约和联系表单。所有表单只在当前浏览器临时校验，没有后端或持久化。统计和客户内容为参考演示，不能冒充真实业绩。

## 环境与运行

Node 24.16.0、pnpm 9.15.4。pnpm install --frozen-lockfile；pnpm dev 默认 http://localhost:3065 ，可通过 PORT 改变。pnpm build 后 pnpm start 提供生产预览。开发与生产缓存分离。前台服务以 Ctrl+C 停止，只停止自己启动的进程。无必须配置的环境变量。

## 修改与验证

pnpm typecheck、pnpm lint、pnpm test、pnpm build；pnpm tpl:check 检查协议。源码入口与常见修改见 docs/ARCHITECTURE.md、docs/CUSTOMIZATION.md 与 customization.json。报告在 reports/，只代表记录的检查，不表示所有动效已逐像素对齐。

## 交付与许可

真实 Git 地址见 template.json。pnpm bundle 在本地 Linux 文件系统生成固定运行包，要求源码已提交且工作树干净。不要提交依赖、缓存、日志、秘密或真实环境配置。图片、字体、参考设计与源码权利分开，见 docs/LICENSE.md。阅读资料不会触发安装或发布。
