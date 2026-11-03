'use client'
import {useEffect,useRef,useState} from 'react'
import Link from 'next/link'
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion'
import {asset,art,text} from '../config'
import {useQuiver} from '../context'
import {headings} from '../content/headings'
import {ui} from '../content/ui'
import {agents} from '../content/agents'
import {EnterHeading} from './Motion'
import {RelitScene} from './RelitScene'
const lights:readonly (readonly[number,number,number])[]=[[.9,.65,.45],[.5,.7,1],[.8,.5,.3],[.6,.9,.7],[.8,.6,1]]
export function Hero(){
 const{t,href}=useQuiver(),[active,setActive]=useState(0),[paused,setPaused]=useState(false),root=useRef<HTMLElement>(null),reduce=useReducedMotion()
 useEffect(()=>{if(reduce||paused||agents.length<2)return;let visible=true;const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});if(root.current)observer.observe(root.current);const timer=window.setInterval(()=>{if(visible&&!document.hidden)setActive(value=>(value+1)%agents.length)},5000);return()=>{clearInterval(timer);observer.disconnect()}},[reduce,paused])
 const agent=agents[active];if(!agent)return null
 return <section className="qv-hero" ref={root} onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setPaused(false)}}><RelitScene colorMap={asset(art.front)} normalMap={asset(art.frontNormal)} tint={lights[active]} label={t(text('随指针与智能体类型改变光照的机器人','Robot relit by your pointer and the selected agent'))} errorLabel={t(ui.visualError)} retryLabel={t(ui.retry)} className="qv-hero-scene"><div className="qv-container qv-hero-content"><p className="qv-kicker">{t(headings.heroKicker)}</p><EnterHeading level={1}>{t(headings.hero)}</EnterHeading><div className="qv-hero-bottom"><div className="qv-hero-intro"><p className="qv-status">{t(headings.bookingNotice)}</p><p>{t(headings.heroIntro)}</p><div className="qv-actions"><Link className="qv-button qv-button-accent" href={href('book')}>{t(ui.book)}</Link><Link className="qv-text-link" href={href('work')}>{t(ui.allWork)}</Link></div></div><div className="qv-hero-instrument" onPointerEnter={()=>setPaused(true)} onPointerLeave={()=>setPaused(false)}><p className="qv-caption">{t(text('01 · 智能体正在工作','01 · Agent at work'))}</p><div className="qv-agent-tabs" role="group" aria-label={t(text('选择智能体光照','Choose an agent light'))}>{agents.map((item,i)=><button key={item.slug} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}>{t(item.role)}</button>)}</div><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={{opacity:0,y:reduce?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.25}}><strong>{t(agent.metric)}</strong><p>{t(agent.metricLabel)}</p><small>{agent.client} · {agent.tools.join(' / ')}</small></motion.div></AnimatePresence></div></div><p className="qv-hero-figure qv-caption">{t(text('图 01 · 单元 01 · 实时光照','Fig. 01 · Unit 01 · Relit in real time'))}</p></div></RelitScene></section>
}
