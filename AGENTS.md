# Quiver 使用规则

先读 .tpl/README.md、.tpl/template.json、.tpl/project.json。保留已有修改，未经批准不添加依赖。品牌在 config.ts，双语内容在 content/，主题在 theme.css，公共交互在 components/，页面只组合区块。链接基于 basePath，独立工程不保存消费方环境或接入记录。

表单仅本地校验，不发送、不保存、不创建预约，不记录个人输入。光照使用本地颜色图与法线图，放大镜使用独立二维画布；错误显式提示并允许重试。尊重减少动态效果，不增加装饰箭头。修改动效后实际触发验证，不以截图或构建替代。检查 typecheck、lint、test、build 与 tpl:check，如实记录未验证项。
