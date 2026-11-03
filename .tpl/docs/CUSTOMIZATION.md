# 修改指南

品牌、Logo、联系方式与年份：src/features/site-templates/catalog/quiver/config.ts。服务在 content/services.ts，智能体在 agents.ts，案例在 work.ts，手记在 reviews.ts 并按案例标识关联，团队在 about.ts，价格和 FAQ 在 common.ts，表单在 forms.ts，政策在 legal.ts。中英文一起维护。

颜色、字号、字体、主要圆角、间距、玻璃卡片和滚动条均在 theme.css。光照参数与生命周期在 RelitScene.tsx；机器人颜色图与法线图必须成对替换。统计照片放大镜在 PhotoLens.tsx，不能误当作第三个机器人光照。手机服务区保留横向原生滚动；案例簿首尾不可越界。

新增页面同时更新 meta.ts 与 .tpl/template.json；截图保留真实宽高。原站没有博客，因此十二张三端展示图中的内容页使用案例详情，不额外编造博客。运行素材在 public/templates/quiver，替换时同步 sources.json 来源与 SHA256。动效改动后实际触发受影响交互。

滚动章节修改：照片目标与手机裁切见 detail-geometry.ts，流程折线见 process-route.ts；滚动长度及内容分别在 DetailView、Process、AgentChapter、CaseBook。不要把手机完整列表重新改成固定镜头，也不要用定时动画替代案例簿滚动角度。手记版式见 review-book.css，页脚揭幕见 footer-reveal.css。
