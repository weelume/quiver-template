import {text} from '../config'
export const processStages=[
 {title:text('审计','Audit'),period:text('第 1 周','Week 1'),description:text('走进团队，梳理时间去向，并为每项机会估价。','We sit with your team, map where the hours go and price every idea.'),x:155,y:170,route:.122},
 {title:text('设计','Design'),period:text('第 2 周','Week 2'),description:text('一个智能体负责一项工作：明确提示词、工具，以及向人工交接的方式。','One agent, one job: the prompts, the tools, the hand-off to a person.'),x:390,y:170,route:.318},
 {title:text('构建','Build'),period:text('第 3–5 周','Weeks 3–5'),description:text('完成系统集成、评估套件，并在人工监督下启动。','Integrations, an evaluation suite and a supervised launch.'),x:585,y:170,route:.48},
 {title:text('运行','Run'),period:text('每周持续','Every week'),description:text('每周五看数据，每月进行调优，每季度构建新的智能体。','Numbers every Friday, tuning every month, new agents every quarter.'),x:155,y:365,route:1},
]
export const blueprintLabels={entrance:text('入口','Entrance'),you:text('当前位置','You are here'),legend:text('图例','Legend'),route:text('路线','Route'),step:text('阶段','Step'),label:text('四阶段流程平面图','Floor plan of our process')}
