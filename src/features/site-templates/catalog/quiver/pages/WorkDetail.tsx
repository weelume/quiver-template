'use client'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {caseStudies,type CaseStudy} from '../content/work'
import {services} from '../content/services'
import {ui} from '../content/ui'
import {Shell} from '../components/Shell'
import {PageIntro} from '../components/PageIntro'
function Content({item}:{item:CaseStudy}){const{t,href}=useQuiver(),service=services.find(service=>service.slug===item.serviceSlug);return <><PageIntro eyebrow={text('案例簿 · '+item.client,'Case book · '+item.client)} title={item.title} intro={item.intro}/><section className="qv-container"><div className="qv-case-meta"><span>{item.client}</span><span>{t(item.category)}</span><span>{item.year}</span><span>{item.weeks} {t(text('周','weeks'))}</span></div><img className="qv-case-cover" src={asset(item.image)} alt={item.client+' · '+t(item.title)}/><div className="qv-case-metrics">{item.metrics.map(metric=><div key={metric.label.en}><strong>{t(metric.value)}</strong><p>{t(metric.label)}</p></div>)}</div></section><section className="qv-section qv-container qv-editorial"><aside><p className="qv-kicker">{t(text('项目档案','Project file'))}</p>{service&&<Link href={href('services/'+service.slug)}>{t(service.title)}</Link>}<div className="qv-tags">{item.tools.map(tool=><span key={tool}>{tool}</span>)}</div></aside><div>{[{title:text('面临的挑战','The challenge'),body:item.challenge},{title:text('我们构建的方案','What we built'),body:item.solution},{title:text('一项清晰的工作','One clear job'),body:item.job},{title:text('带来的改变','What changed'),body:item.changed}].map(section=><div key={section.title.en}><h2>{t(section.title)}</h2><p>{t(section.body)}</p></div>)}<blockquote className="qv-case-quote"><p>“{t(item.quote)}”</p><footer><img src={asset(item.portrait)} alt=""/><div>{item.author}<span>{t(item.authorRole)} · {item.client}</span></div></footer></blockquote><p className="qv-form-note">{t(ui.demoMetric)}</p></div></section></>}
function Detail({item,...props}:SiteTemplatePageProps&{item:CaseStudy}){return <Shell {...props} commission><Content item={item}/></Shell>}
export const Northwind=(p:SiteTemplatePageProps)=><Detail {...p} item={caseStudies[0]}/>
export const Ledgerly=(p:SiteTemplatePageProps)=><Detail {...p} item={caseStudies[1]}/>
export const Oakline=(p:SiteTemplatePageProps)=><Detail {...p} item={caseStudies[2]}/>
export const Vantage=(p:SiteTemplatePageProps)=><Detail {...p} item={caseStudies[3]}/>
export const Brightpath=(p:SiteTemplatePageProps)=><Detail {...p} item={caseStudies[4]}/>
