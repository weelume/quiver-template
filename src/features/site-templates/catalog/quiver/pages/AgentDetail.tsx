'use client'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {agents,type Agent} from '../content/agents'
import {Shell} from '../components/Shell'
import {PageIntro} from '../components/PageIntro'
import {SectionHeading} from '../components/SectionHeading'
import {OtherAgents} from '../components/OtherAgents'
function Content({agent}:{agent:Agent}){const{t,href}=useQuiver();return <><PageIntro eyebrow={agent.role} title={agent.title} intro={agent.intro}/><section className="qv-container qv-detail-hero"><div className="qv-object-stage qv-agent-stage"><img src={asset(agent.image)} alt={t(agent.title)}/><span className="qv-caption">{agent.client} · {agent.since}</span></div><div className="qv-detail-summary"><p className="qv-kicker">{t(text('正在工作','On duty'))}</p><div className="qv-detail-number"><strong>{t(agent.metric)}</strong><span>{t(agent.metricLabel)}</span></div><p>{agent.client} · {t(text('自','Since'))} {agent.since}</p><div className="qv-tags">{agent.tools.map(tool=><span key={tool}>{tool}</span>)}</div><Link className="qv-button qv-button-dark" href={href('book')}>{t(text('构建同类智能体','Build one like this'))}</Link></div></section><section className="qv-section qv-container"><SectionHeading title={text('智能体如何工作','How it does the job.')}/><ol className="qv-step-grid">{agent.steps.map((step,i)=><li key={step.en}><span className="qv-caption">{String(i+1).padStart(2,'0')}</span><h3>{t(step)}</h3></li>)}</ol></section><section className="qv-section qv-container qv-editorial"><aside><p className="qv-kicker">{t(text('护栏与交接','Guardrails & hand-off'))}</p></aside><div><h2>{t(text('它遵循的规则','The rules it works by.'))}</h2><ul>{agent.rules.map(rule=><li key={rule.en}>{t(rule)}</li>)}</ul><p>{t(text('所有涉及权限与人工审批的边界，都在构建前共同确认。','We agree every permission and human approval boundary before the build.'))}</p></div></section><OtherAgents current={agent.slug}/></>}
function Detail({agent,...props}:SiteTemplatePageProps&{agent:Agent}){return <Shell {...props} commission><Content agent={agent}/></Shell>}
export const Support=(p:SiteTemplatePageProps)=><Detail {...p} agent={agents[0]}/>
export const Sales=(p:SiteTemplatePageProps)=><Detail {...p} agent={agents[1]}/>
export const Finance=(p:SiteTemplatePageProps)=><Detail {...p} agent={agents[2]}/>
export const Voice=(p:SiteTemplatePageProps)=><Detail {...p} agent={agents[3]}/>
export const Research=(p:SiteTemplatePageProps)=><Detail {...p} agent={agents[4]}/>
