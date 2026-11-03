'use client'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {services,type Service} from '../content/services'
import {headings} from '../content/headings'
import {ui} from '../content/ui'
import {Shell} from '../components/Shell'
import {PageIntro} from '../components/PageIntro'
import {SectionHeading} from '../components/SectionHeading'
import {WorkCards} from '../components/WorkCards'
import {Reveal} from '../components/Motion'
function Content({service}:{service:Service}){const{t,href}=useQuiver();return <><PageIntro eyebrow={text('服务','Services')} title={service.title} intro={service.intro}/><section className="qv-container qv-detail-hero"><div className="qv-object-stage"><img src={asset(service.image)} alt={t(service.title)}/><span className="qv-caption">{t(service.duration)} · {t(text('固定范围','Fixed scope'))}</span></div><div className="qv-detail-summary"><p className="qv-kicker">{t(ui.outcome)}</p><h2>{t(service.outcome)}</h2><p>{t(service.description)}</p><div className="qv-detail-number"><strong>{t(service.metric)}</strong><span>{t(service.metricLabel)}</span></div><p className="qv-caption">{t(ui.from)} ${service.price.toLocaleString('en-US')} · {t(service.duration)}</p><Link className="qv-button qv-button-dark" href={href('book')+'?service='+service.slug}>{t(ui.book)}</Link></div></section><section className="qv-section qv-container"><SectionHeading title={headings.included}/><ul className="qv-included-grid">{service.features.map(item=><li key={item.en}>{t(item)}</li>)}</ul></section><section className="qv-section qv-container"><SectionHeading title={headings.serviceSteps}/><ol className="qv-step-grid">{service.steps.map((step,i)=><li key={step.en}><span className="qv-caption">{String(i+1).padStart(2,'0')}</span><h3>{t(step)}</h3></li>)}</ol></section><section className="qv-section qv-container qv-editorial"><aside><p className="qv-kicker">{t(text('服务笔记','Service notes'))}</p><Link href={href('services')}>{t(ui.allServices)}</Link></aside><div>{service.sections.map(section=><Reveal key={section.title.en}><h2>{t(section.title)}</h2><p>{t(section.body)}</p>{section.bullets&&<ul>{section.bullets.map(item=><li key={item.en}>{t(item)}</li>)}</ul>}</Reveal>)}</div></section>{service.cases.length>0&&<section className="qv-section qv-container"><SectionHeading title={headings.builtWith}/><WorkCards slugs={service.cases}/></section>}</>}
function Detail({service,...props}:SiteTemplatePageProps&{service:Service}){return <Shell {...props} commission><Content service={service}/></Shell>}
export const Strategy=(p:SiteTemplatePageProps)=><Detail {...p} service={services[0]}/>
export const Builds=(p:SiteTemplatePageProps)=><Detail {...p} service={services[1]}/>
export const Automation=(p:SiteTemplatePageProps)=><Detail {...p} service={services[2]}/>
export const Voice=(p:SiteTemplatePageProps)=><Detail {...p} service={services[3]}/>
export const Training=(p:SiteTemplatePageProps)=><Detail {...p} service={services[4]}/>
