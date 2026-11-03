'use client'
import {useState} from 'react'
import Link from 'next/link'
import {motion,useMotionValueEvent} from 'framer-motion'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {caseStudies,type CaseStudy} from '../content/work'
import {headings} from '../content/headings'
import {ui} from '../content/ui'
import {SectionHeading} from './SectionHeading'
import {useScrollChapter} from './useScrollChapter'
import './scroll-chapters.css'
function Picture({item,index}:{item:CaseStudy;index:number}){const{t,href}=useQuiver();return <div className="qv-book-picture"><p className="qv-caption">{t(text('{{brand}} · 精选案例 2025–26','{{brand}} · Selected work 2025–26'))}</p><Link href={href('work/'+item.slug)} aria-label={t(item.title)}><img src={asset(item.image)} alt={`${item.client} · ${t(item.title)}`}/></Link><p className="qv-caption">{String(index+1).padStart(2,'0')} · {item.client}</p><span className="qv-book-page-no">{index*2+6}</span></div>}
function Content({item,index}:{item:CaseStudy;index:number}){const{t,href}=useQuiver();return <div className="qv-book-text"><p className="qv-caption">{String(index+1).padStart(2,'0')} / {String(caseStudies.length).padStart(2,'0')} · {item.client}</p><p>{t(item.category)} · {item.year}</p><h3>{t(item.title)}</h3><div className="qv-book-result"><strong>{t(item.metric)}</strong><span>{t(item.metricLabel)}</span></div><Link className="qv-text-link" href={href('work/'+item.slug)}>{t(ui.readCase)}</Link><span className="qv-book-page-no">{index*2+7}</span></div>}
export function CaseBook(){
 const{t,href}=useQuiver(),{root,progress,stacked,seek}=useScrollChapter(caseStudies.length),[position,setPosition]=useState(0)
 useMotionValueEvent(progress,'change',value=>setPosition(value*Math.max(caseStudies.length-1,0)))
 const index=Math.min(caseStudies.length-1,Math.floor(position)),next=Math.min(caseStudies.length-1,index+1),page=Math.min(caseStudies.length-1,Math.round(position)),item=caseStudies[index]
 const rotation=-(position-Math.floor(position))*180
 if(!item)return null
 const move=(direction:number)=>seek(page+direction)
 return <section ref={root} className={`qv-case-book qv-book-scroller${stacked?' qv-chapter-stacked':''}`} style={{height:stacked?undefined:`${Math.max(caseStudies.length*70,200)}svh`}}><div className="qv-book-pin"><div className="qv-container"><div className="qv-heading-row"><SectionHeading eyebrow={text('07 · 精选案例','07 · Selected work')} title={headings.caseBook}/><Link className="qv-text-link" href={href('work')}>{t(ui.allWork)}</Link></div>
 {stacked?<ol className="qv-book-all">{caseStudies.map((study,i)=><li key={study.slug}><Picture item={study} index={i}/><Content item={study} index={i}/></li>)}</ol>:<><div className="qv-book-controls"><button type="button" disabled={page===0} aria-label={t(ui.previousCase)} onClick={()=>move(-1)}>←</button><p aria-live="polite">{page+1} / {caseStudies.length} · {t(caseStudies[page].title)}</p><button type="button" disabled={page===caseStudies.length-1} aria-label={t(ui.nextCase)} onClick={()=>move(1)}>→</button></div><div className="qv-book-stage" role="group" aria-label={t(headings.caseBook)} tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1)}else if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}}}>
 <div className="qv-book-spread"><Picture item={item} index={index}/><Content item={caseStudies[next]} index={next}/></div>
 {/* 纸张角度直接来自滚动进度，停止或反向滚动时保持对应角度，不以定时播放代替手动翻页。 */}
 {next!==index&&<motion.div className="qv-turn-sheet qv-turn-next" aria-hidden="true" inert style={{rotateY:rotation}}><div className="qv-sheet-face qv-sheet-front"><Content item={item} index={index}/></div><div className="qv-sheet-face qv-sheet-back"><Picture item={caseStudies[next]} index={next}/></div><div className="qv-sheet-shadow"/></motion.div>}<div className="qv-book-spine" aria-hidden="true"/>
 </div></>}
 </div></div></section>
}
