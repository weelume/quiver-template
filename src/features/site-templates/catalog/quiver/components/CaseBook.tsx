'use client'
import {useState} from 'react'
import Link from 'next/link'
import {motion,useReducedMotion} from 'framer-motion'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {caseStudies,type CaseStudy} from '../content/work'
import {headings} from '../content/headings'
import {ui} from '../content/ui'
import {SectionHeading} from './SectionHeading'
function Picture({item,index}:{item:CaseStudy;index:number}){const{t,href}=useQuiver();return <div className="qv-book-picture"><p className="qv-caption">{t(text('{{brand}} · 精选案例 2025–26','{{brand}} · Selected work 2025–26'))}</p><Link href={href('work/'+item.slug)} aria-label={t(item.title)}><img src={asset(item.image)} alt={`${item.client} · ${t(item.title)}`}/></Link><p className="qv-caption">{String(index+1).padStart(2,'0')} · {item.client}</p><span className="qv-book-page-no">{index*2+6}</span></div>}
function Content({item,index}:{item:CaseStudy;index:number}){const{t,href}=useQuiver();return <div className="qv-book-text"><p className="qv-caption">{String(index+1).padStart(2,'0')} / {String(caseStudies.length).padStart(2,'0')} · {item.client}</p><p>{t(item.category)} · {item.year}</p><h3>{t(item.title)}</h3><div className="qv-book-result"><strong>{t(item.metric)}</strong><span>{t(item.metricLabel)}</span></div><Link className="qv-text-link" href={href('work/'+item.slug)}>{t(ui.readCase)}</Link><span className="qv-book-page-no">{index*2+7}</span></div>}
export function CaseBook(){
 const{t,href}=useQuiver(),[index,setIndex]=useState(0),[turn,setTurn]=useState<{next:number;direction:1|-1}|null>(null),reduce=useReducedMotion(),item=caseStudies[index]
 if(!item)return null
 const move=(direction:1|-1)=>{const next=index+direction;if(turn||next<0||next>=caseStudies.length)return;if(reduce){setIndex(next);return}setTurn({next,direction})}
 const behind=turn?caseStudies[turn.next]:item,behindIndex=turn?turn.next:index
 return <section className="qv-section qv-case-book"><div className="qv-container"><div className="qv-heading-row"><SectionHeading eyebrow={text('07 · 精选案例','07 · Selected work')} title={headings.caseBook}/><Link className="qv-text-link" href={href('work')}>{t(ui.allWork)}</Link></div><div className="qv-book-controls"><button type="button" disabled={index===0||!!turn} aria-label={t(ui.previousCase)} onClick={()=>move(-1)}>←</button><p aria-live="polite">{index+1} / {caseStudies.length} · <span>{t(item.title)}</span></p><button type="button" disabled={index===caseStudies.length-1||!!turn} aria-label={t(ui.nextCase)} onClick={()=>move(1)}>→</button></div><div className="qv-book-stage" role="group" aria-label={t(headings.caseBook)} tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1)}else if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}}}><div className="qv-book-spread"><Picture item={behind} index={behindIndex}/><Content item={behind} index={behindIndex}/></div>
 {turn&&<>
  <div className={`qv-book-still ${turn.direction===1?'qv-book-still-left':'qv-book-still-right'}`} aria-hidden="true" inert>{turn.direction===1?<Picture item={item} index={index}/>:<Content item={item} index={index}/>}</div>
  {/* 真实双面纸张绕书脊旋转；翻完后再移除纸层，避免交叉淡入替代翻页。 */}
  <motion.div className={`qv-turn-sheet ${turn.direction===1?'qv-turn-next':'qv-turn-prev'}`} aria-hidden="true" inert initial={{rotateY:0}} animate={{rotateY:turn.direction===1?-180:180}} transition={{duration:.85,ease:[.45,0,.2,1]}} onAnimationComplete={()=>{setIndex(turn.next);setTurn(null)}}><div className="qv-sheet-face qv-sheet-front">{turn.direction===1?<Content item={item} index={index}/>:<Picture item={item} index={index}/>}</div><div className="qv-sheet-face qv-sheet-back">{turn.direction===1?<Picture item={behind} index={behindIndex}/>:<Content item={behind} index={behindIndex}/>}</div><div className="qv-sheet-shadow"/></motion.div>
 </>}<div className="qv-book-spine" aria-hidden="true"/></div></div></section>
}
