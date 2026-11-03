'use client'
import Link from 'next/link'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {caseStudies} from '../content/work'
import {ui} from '../content/ui'
import {Reveal} from './Motion'
export function WorkCards({slugs}:{slugs?:string[]}){const{t,href}=useQuiver(),items=slugs?caseStudies.filter(item=>slugs.includes(item.slug)):caseStudies;return <div className="qv-work-grid">{items.map((item,i)=><Reveal key={item.slug} delay={i%2*.08}><article className="qv-work-card"><Link className="qv-work-image" href={href('work/'+item.slug)}><img src={asset(item.image)} alt={t(item.title)}/><span className="qv-work-badge">{t(item.metric)}<small>{t(item.metricLabel)}</small></span></Link><div className="qv-work-heading"><span className="qv-caption">{String(i+1).padStart(2,'0')} · {item.client}</span><span className="qv-caption">{t(item.category)} · {item.year}</span></div><h3><Link href={href('work/'+item.slug)}>{t(item.title)}</Link></h3><p>{t(item.intro)}</p><Link className="qv-text-link" href={href('work/'+item.slug)}>{t(ui.readCase)}</Link></article></Reveal>)}{!items.length&&<p>{t(text('新的项目正在整理中','New projects are being documented.'))}</p>}</div>}
