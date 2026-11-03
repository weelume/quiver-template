'use client'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {agents} from '../content/agents'
import {headings} from '../content/headings'
import {Shell} from '../components/Shell'
import {PageIntro} from '../components/PageIntro'
import {Metrics} from '../components/Metrics'
import {Reveal} from '../components/Motion'
function Content(){const{t,href}=useQuiver();return <><PageIntro eyebrow={text('智能体','Agents')} title={headings.agentIndex} intro={text('一个智能体，一项工作。连接你的工具，遵循你的规则，并知道何时把工作交给人工。','One agent, one job. Inside your tools, within your rules, with a clear hand-off to a person.')}/><section className="qv-container qv-section qv-agents-grid">{agents.map((agent,i)=><Reveal key={agent.slug} delay={i%3*.08}><article><Link className="qv-agent-portrait" href={href('agents/'+agent.slug)}><img src={asset(agent.image)} alt={t(agent.title)}/><span>{String(i+1).padStart(2,'0')}</span></Link><p className="qv-caption">{t(agent.role)}</p><h2><Link href={href('agents/'+agent.slug)}>{t(agent.title)}</Link></h2><p>{t(agent.intro)}</p><div className="qv-agent-result"><strong>{t(agent.metric)}</strong><span>{t(agent.metricLabel)}</span></div><div className="qv-tags">{agent.tools.map(tool=><span key={tool}>{tool}</span>)}</div><Link className="qv-text-link" href={href('agents/'+agent.slug)}>{t(text('认识这个智能体','Meet the agent'))}</Link></article></Reveal>)}<article className="qv-agent-reserved"><p className="qv-caption">06 · {t(text('预留位置 · 下一个构建','Reserved slot · Next build'))}</p><h2>{t(text('委托一个新智能体','Commission a new agent.'))}</h2><p>{t(text('这个位置留给下一个智能体。告诉我们你想交给它的工作。','This slot is kept for the next one. Tell us the work you want gone.'))}</p><Link className="qv-button qv-button-dark" href={href('book')}>{t(text('开始交流','Commission an agent'))}</Link></article></section><Metrics/></>}
export default function Agents(props:SiteTemplatePageProps){return <Shell {...props} commission><Content/></Shell>}
