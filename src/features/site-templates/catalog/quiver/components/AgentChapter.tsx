'use client'
import {useEffect,useRef,useState,type CSSProperties} from 'react'
import Link from 'next/link'
import {motion,useMotionValueEvent,useReducedMotion,useScroll,useTransform} from 'framer-motion'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {agents,type Agent} from '../content/agents'
import {headings} from '../content/headings'
import {ui} from '../content/ui'
import {SectionHeading} from './SectionHeading'
import './agent-gallery.css'
const accents=['#f2eee8','#ff5a36','#ffb547','#5a72ff','#3cc8c0']
function AgentLabel({agent,index}:{agent:Agent;index:number}){const{t,href}=useQuiver();return <article className="qv-gallery-label"><p className="qv-caption">{String(index+1).padStart(2,'0')} · {t(agent.role)}</p><h3>{t(agent.title)}</h3><p className="qv-gallery-task">{t(agent.intro)}</p><div className="qv-gallery-result"><strong>{t(agent.metric)}</strong><span>{t(agent.metricLabel)}</span></div><div className="qv-gallery-label-foot"><p className="qv-caption">{t(ui.onDuty)} <b>{agent.client}</b></p><ul>{agent.tools.map(tool=><li key={tool}>{tool}</li>)}</ul></div><Link className="qv-text-link" href={href('agents/'+agent.slug)}>{t(text('认识这个智能体','Meet the agent'))}</Link></article>}
function Portrait({agent,index,focusable=true}:{agent:Agent;index:number;focusable?:boolean}){const{t,href}=useQuiver();return <><span className="qv-gallery-wire"/><span className="qv-gallery-lamp"><i/></span><span className="qv-gallery-pool"/><Link className="qv-gallery-frame" tabIndex={focusable?0:-1} href={href('agents/'+agent.slug)} aria-label={t(agent.title)}><img src={asset(agent.image)} alt={t(agent.title)}/><span className="qv-gallery-shade"/></Link><p className="qv-gallery-caption">{String(index+1).padStart(2,'0')} · {t(text('投入使用','On duty since'))} {agent.since}</p></>}
export function AgentChapter(){
 const{t}=useQuiver(),ref=useRef<HTMLElement>(null),reduce=useReducedMotion(),[active,setActive]=useState(0),[q,setQ]=useState(0),[view,setView]=useState({width:1440,height:1000}),[phone,setPhone]=useState(false)
 const{scrollYProgress}=useScroll({target:ref,offset:['start start','end end']})
 const tablet=view.width<=1050,w=tablet?Math.min(304,view.width*.365):Math.min(360,view.height*.36),h=w*1.25,step=w*(tablet?504/304:5/3),originY=view.height*(tablet?720/1180:.63),top=-view.height*(tablet?.2:.18),anchor=view.width*(tablet?38/834:546/1440)
 const x=useTransform(scrollYProgress,[0,1],[0,-Math.max(agents.length-1,0)*step])
 useMotionValueEvent(scrollYProgress,'change',value=>{const position=value*Math.max(agents.length-1,0);setQ(position);setActive(Math.min(agents.length-1,Math.round(position)))})
 useEffect(()=>{const update=()=>{setView({width:document.documentElement.clientWidth,height:window.innerHeight});setPhone(window.matchMedia('(max-width:700px)').matches)};update();window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update)},[])
 const select=(index:number)=>{const node=ref.current;if(!node)return;const start=node.getBoundingClientRect().top+window.scrollY,range=node.offsetHeight-window.innerHeight;window.scrollTo({top:start+Math.max(0,range)*index/Math.max(agents.length-1,1),behavior:reduce?'auto':'smooth'})}
 if(!agents.length)return null
 const stack=phone||!!reduce
 return <section ref={ref} className={`qv-gallery${stack?' qv-gallery-stack':''}`} style={{'--qv-gallery-count':agents.length} as CSSProperties}>
  {stack?<div className="qv-container qv-gallery-stackwrap"><SectionHeading eyebrow={text('06 · 智能体','06 · The agents')} title={headings.agents}/><ol className="qv-gallery-list">{agents.map((agent,i)=><li key={agent.slug} style={{'--gallery-lit':1,'--gallery-accent':accents[i]} as CSSProperties}><div className="qv-gallery-stackportrait"><Portrait agent={agent} index={i}/></div><AgentLabel agent={agent} index={i}/></li>)}</ol></div>:<div className="qv-gallery-pin">
   <div className="qv-gallery-hall"><div className="qv-gallery-floor" style={{top:top+originY+h*.42}}/>
    {/* 墙体保持固定，只有墙内轨道平移；透视投影因此保留每幅画经过时的距离和尺寸变化。 */}
    <div className="qv-gallery-plane" style={{left:anchor-900,top,width:900+step*(agents.length+4),height:originY+h*.72,transformOrigin:`900px ${originY}px`}}><span className="qv-gallery-rail"/><motion.div className="qv-gallery-track" style={{left:900,x}}>{agents.map((agent,i)=><div className="qv-gallery-bay" key={agent.slug} aria-hidden={Math.abs(q-i)>1.5} inert={Math.abs(q-i)>1.5} style={{visibility:Math.abs(q-i)>1.5?'hidden':'visible',left:i*step,top:originY-h/2,width:w,height:h,'--gallery-lit':Math.max(0,1-Math.abs(q-i)),'--gallery-accent':accents[i]} as CSSProperties}><Portrait agent={agent} index={i} focusable={i===active}/></div>)}</motion.div></div>
   </div>
   <div className="qv-container qv-gallery-ui"><SectionHeading eyebrow={text('06 · 智能体','06 · The agents')} title={headings.agents}/><div className="qv-gallery-side"><div key={active} className="qv-gallery-card-enter"><AgentLabel agent={agents[active]} index={active}/></div><div className="qv-gallery-controls" role="group" aria-label={t(text('前往智能体','Walk to an agent'))}>{agents.map((agent,i)=><button key={agent.slug} type="button" aria-label={t(agent.title)} aria-pressed={active===i} onClick={()=>select(i)}>{String(i+1).padStart(2,'0')}</button>)}<p>{t(text('向下滚动 逐一认识','Scroll to step through'))}</p></div></div></div>
  </div>}
 </section>
}
