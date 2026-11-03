# 架构

feature-based 入口：src/features/site-templates/catalog/quiver。config.ts 集中品牌与素材键；content/ 按服务、智能体、案例、价格与 FAQ、流程、团队、表单、政策、UI 和标题拆分。theme.css 集中主题、玻璃卡片、滚动条及三端布局。

components/ 的 RelitScene.tsx 管理 WebGL 纹理、着色器、指针光源、离屏暂停与资源清理；PhotoLens.tsx 仅管理照片二维放大；CaseBook.tsx 保持双面纸张翻页；AgentChapter.tsx 用原生整页滚动驱动固定画廊。导航、语言、菜单和页脚在 Shell.tsx，host.tsx 提供可选消费方品牌边界。

pages/ 分别组合各类页面，meta.ts 注册 27 页，src/app/[[...slug]]/page.tsx 提供独立路由与静态生成，未知路径返回真实 404。routing.ts 负责双语深层路径；booking.ts 提供 PT 工作日与工时估算纯函数。没有服务器业务层或外部表单服务。
