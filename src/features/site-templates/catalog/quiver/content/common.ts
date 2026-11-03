import {text} from '../config'
export const metrics=[{value:1.9,suffix:text('M','M'),label:text('智能体每月完成的任务','tasks a month, done by our agents')},{value:64,suffix:text('',''),label:text('投入运行的智能体','agents in production')},{value:6,suffix:text(' 周',' wks'),label:text('从首次交流到正式运行','from first call to live')},{value:0,prefix:'$',suffix:text('',''),label:text('固定费用项目的额外启动费','setup fees on a fixed-price build')}]
export const clients=[
 {name:'Northwind Dental',role:text('语音智能体','Voice agent'),result:text('预约增长 31%','+31% bookings')},
 {name:'Ledgerly',role:text('财务智能体','Finance agent'),result:text('结账缩短 6 天','−6 days close')},
 {name:'Oakline Home',role:text('客服智能体','Support agent'),result:text('自动完成 71% 工单','71% auto-closed')},
 {name:'Vantage Legal',role:text('研究智能体','Research agent'),result:text('初稿提速 6 倍','6× faster drafts')},
 {name:'Brightpath Realty',role:text('销售智能体','Sales agent'),result:text('看房预约增至 3.2 倍','3.2× viewings')},
 {name:'Halcyon Home',role:text('客服智能体','Support agent'),result:text('支持 4 种语言','4 languages')},
 {name:'Northgate Logistics',role:text('财务智能体','Finance agent'),result:text('每周节省 11 小时','11 h a week back')},
 {name:'Ardent Dental',role:text('语音智能体','Voice agent'),result:text('没有遗漏来电','0 missed calls')},
]
export const plans=[
 {id:'audit',title:text('流程审计','Audit'),price:4500,period:text('一次性','one time'),intro:text('知道哪些工作值得优先自动化。','Know what to automate first.'),cta:text('预约流程审计','Book the audit'),features:[text('1 周流程审计','1-week process audit'),text('十项机会的投入回报模型','ROI model for 10 ideas'),text('数据与风险评估','Data & risk review'),text('90 天路线图','90-day roadmap')],number:'QV-0041'},
 {id:'build',title:text('智能体构建','Agent build'),price:12000,period:text('每个智能体','per agent'),intro:text('一个智能体 六周投入运行','One agent, live in six weeks.'),cta:text('开始构建','Start a build'),features:[text('包含流程审计的全部内容','Everything in Audit'),text('端到端定制智能体','Custom agent, end to end'),text('系统集成与评估','Integrations & evaluation'),text('30 天调优','30 days of tuning')],number:'QV-0042'},
 {id:'partner',title:text('AI 长期伙伴','AI partner'),price:5800,period:text('每月','per month'),intro:text('为每一个新智能体提供持续支持。','A studio on call for every new agent.'),cta:text('一起聊聊','Talk to us'),features:[text('最多三个在运行智能体','Up to 3 agents in production'),text('每周数据回顾','Weekly numbers review'),text('每季度开展新构建','New builds every quarter'),text('优先支持','Priority support')],number:'QV-0043'},
]
export const faqGroups=[{id:'all',title:text('全部','All')},{id:'start',title:text('开始之前','Getting started')},{id:'build',title:text('构建过程','Build')},{id:'run',title:text('上线之后','After launch')}]
export const faqs=[
 {id:'start',q:text('从哪里开始','Where do we start?'),a:text('从流程审计开始。用一周梳理团队的时间去向，并为每个机会估价，优先建设最有机会带来回报的智能体。',"With the audit. In one week we map where your team's hours go and price every idea, so you build the agent that pays back first.")},
 {id:'start',q:text('多久可以正式运行','How long until an agent is live?'),a:text('大多数智能体在四至六周内运行：一周设计、三周构建与测试，再进行有监督的启动。','Most agents go live in four to six weeks: one week of design, three of build and testing, then a supervised launch.')},
 {id:'build',q:text('可以连接哪些工具','Which tools do you work with?'),a:text('从团队已经使用的工具出发，包括 HubSpot、Salesforce、Zendesk、Slack、Gmail、Xero、NetSuite、Notion，以及多数提供 API 的工具。','The ones you already use: HubSpot, Salesforce, Zendesk, Slack, Gmail, Xero, NetSuite, Notion and most tools with an API.')},
 {id:'build',q:text('使用哪些 AI 模型','Which AI models do you use?'),a:text('根据任务选择，并在确定方案前测试。原站服务说明承诺客户数据不用于训练公共模型；本演示不连接模型或处理业务数据。','We choose per job and test before we commit. The reference service states that client data is never used to train a public model; this demo does not connect a model or process business data.')},
 {id:'build',q:text('智能体不确定时会怎样','What happens when the agent is not sure?'),a:text('它会将任务和简短摘要交给人工。何时交接由客户共同确定。','It hands the task to a person with a short summary of what it found. You decide where that line sits.')},
 {id:'run',q:text('如何判断是否有效','How do we know it is working?'),a:text('每个智能体随附评估套件和每周报告，记录任务完成、节省时间、错误与人工交接。','Every agent ships with an evaluation suite and a weekly report: tasks done, time saved, errors and hand-offs.')},
 {id:'run',q:text('智能体归谁所有','Who owns the agent?'),a:text('客户拥有智能体。提示词、代码与数据保留在客户账户，并提供便于团队自行运行的文档。','You do. The prompts, the code and the data stay in your accounts, documented so your team can run them.')},
 {id:'start',q:text('是否服务小型团队','Do you work with small teams?'),a:text('可以。原站客户通常有 10 至 300 人。流程审计会如实评估当前是否值得使用智能体。','Yes. Most clients have 10 to 300 people. The audit tells you honestly whether an agent is worth it yet.')},
]
