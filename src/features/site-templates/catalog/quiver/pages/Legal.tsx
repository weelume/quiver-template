'use client'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {asset,art,text} from '../config'
import {useQuiver} from '../context'
import {legal} from '../content/legal'
import {Shell} from '../components/Shell'
import {PageIntro} from '../components/PageIntro'
function Content({kind}:{kind:keyof typeof legal}){const{t,href}=useQuiver(),page=legal[kind],[active,setActive]=useState(0);useEffect(()=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){const index=page.sections.findIndex(item=>kind+'-'+item.id===entry.target.id);if(index>=0)setActive(index)}},{rootMargin:'-15% 0px -55% 0px'});for(const section of page.sections){const element=document.getElementById(kind+'-'+section.id);if(element)observer.observe(element)}return()=>observer.disconnect()},[page,kind]);return <><PageIntro eyebrow={text('法律 · 说明','Legal · Fine print')} title={page.title}/><nav className="qv-container qv-legal-tabs" aria-label={t(text('法律页面','Legal pages'))}>{(['privacy','terms','cookies'] as const).map(key=><Link key={key} aria-current={kind===key?'page':undefined} href={href(key)}>{t(legal[key].title)}</Link>)}</nav><div className="qv-container qv-legal-date qv-caption">{t(text('更新于 2026 年 11 月 3 日 · 本地演示说明','Updated 3 November 2026 · Local demo notice'))}</div><section className="qv-container qv-section qv-legal-layout"><aside><p className="qv-caption">{t(text('本页内容','On this page'))} · {active+1} / {page.sections.length}</p><nav>{page.sections.map((section,i)=><a key={section.id} href={'#'+kind+'-'+section.id} aria-current={active===i?'location':undefined}><span>{String(i+1).padStart(2,'0')}</span>{t(section.title)}</a>)}</nav><img src={asset(art.buildTeam)} alt={t(text('工作室团队','The studio team'))}/><p className="qv-caption">{t(text('图 01 · 团队 · 旧金山','Fig. 01 · The team · San Francisco'))}</p></aside><article><p className="qv-lead">{t(page.intro)}</p>{page.sections.map(section=><section key={section.id} id={kind+'-'+section.id}><h2>{t(section.title)}</h2><p>{t(section.body)}</p></section>)}<div className="qv-legal-question"><h3>{t(text('对本页有疑问？','A question about this page?'))}</h3><Link className="qv-text-link" href={href('contact')}>{t(text('查看联系页面','Visit the contact page'))}</Link></div></article></section></>}
function Legal({kind,...props}:SiteTemplatePageProps&{kind:keyof typeof legal}){return <Shell {...props}><Content kind={kind}/></Shell>}
export const Privacy=(p:SiteTemplatePageProps)=><Legal {...p} kind="privacy"/>
export const Terms=(p:SiteTemplatePageProps)=><Legal {...p} kind="terms"/>
export const Cookies=(p:SiteTemplatePageProps)=><Legal {...p} kind="cookies"/>
