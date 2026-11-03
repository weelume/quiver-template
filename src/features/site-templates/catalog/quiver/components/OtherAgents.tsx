'use client'
import Link from 'next/link'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {agents} from '../content/agents'
import {ui} from '../content/ui'
import {SectionHeading} from './SectionHeading'
export function OtherAgents({current}:{current:string}){const{t,href}=useQuiver();return <section className="qv-section qv-container"><SectionHeading title={text('其他正在工作的智能体','Other agents on duty.')}/><div className="qv-other-agents">{agents.filter(item=>item.slug!==current).map(item=><article key={item.slug}><Link href={href('agents/'+item.slug)}><img src={asset(item.image)} alt={t(item.title)}/><h3>{t(item.title)}</h3></Link><p>{t(item.metric)} · {t(item.metricLabel)}</p><Link className="qv-text-link" href={href('agents/'+item.slug)}>{t(ui.hireAgent)}</Link></article>)}</div></section>}
