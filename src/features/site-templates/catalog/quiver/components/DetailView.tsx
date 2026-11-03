'use client'
import {useEffect,useRef,useState,type CSSProperties} from 'react'
import Link from 'next/link'
import {motion,useMotionValueEvent,useReducedMotion,useScroll} from 'framer-motion'
import {asset,art,text} from '../config'
import {useQuiver} from '../context'
import {headings} from '../content/headings'
import {SectionHeading} from './SectionHeading'
import {detailGeometry,detailIndex,detailStops,detailCropPosition} from '../detail-geometry'
import './detail-view.css'
const details=[
 {title:text('看得比别人更仔细','Look closer than everyone else.'),body:text('多数工作都藏在细节里：复制粘贴、追问与核查。','Most of the work is hidden in the details: the copy-paste, the chasing, the checking.')},
 {title:text('找到重复的模式','Find the pattern.'),body:text('每项重复工作都有自己的形状。我们先梳理，再自动化。','Every repeated task has a shape. We map it before we automate it.')},
 {title:text('再交给智能体','Then hand it to an agent.'),body:text('一个智能体，一项工作，每周衡量。','One agent, one job, measured every week.')},
]
export function DetailView(){
 const{t,href}=useQuiver(),reduce=useReducedMotion(),root=useRef<HTMLElement>(null),photo=useRef<HTMLDivElement>(null)
 const[active,setActive]=useState(0),[size,setSize]=useState({width:0,height:0}),[stack,setStack]=useState(false),[tablet,setTablet]=useState(false)
 const{scrollYProgress}=useScroll({target:root,offset:['start start','end end']})
 useMotionValueEvent(scrollYProgress,'change',value=>{if(!stack&&!reduce)setActive(detailIndex(value))})
 useEffect(()=>{
  const narrow=window.matchMedia('(max-width:700px)'),portrait=window.matchMedia('(max-width:1050px)')
  const update=()=>{setStack(narrow.matches);setTablet(portrait.matches)}
  update();narrow.addEventListener('change',update);portrait.addEventListener('change',update)
  return()=>{narrow.removeEventListener('change',update);portrait.removeEventListener('change',update)}
 },[])
 useEffect(()=>{const node=photo.current;if(!node)return;const observer=new ResizeObserver(entries=>{const r=entries[0].contentRect;setSize({width:r.width,height:r.height})});observer.observe(node);return()=>observer.disconnect()},[])
 const geometry=detailGeometry(size.width,size.height,active,tablet),stacked=stack||!!reduce
 const select=(index:number)=>{
  if(stacked){setActive(index);return}
  const node=root.current;if(!node)return
  // 按钮定位到状态区间内部，避免临界点舍入导致返回上一项；滚动仍由浏览器原生处理。
  const start=node.getBoundingClientRect().top+window.scrollY,range=Math.max(0,node.offsetHeight-window.innerHeight)
  window.scrollTo({top:start+range*(index+.25)/details.length,behavior:'smooth'})
 }
 const transition={duration:reduce?0:.8,ease:[.2,.8,.2,1] as const}
 return <section ref={root} className={`qv-detail qv-detail-scene${stacked?' qv-detail-stacked':''}`}>
  <div className="qv-detail-pin"><div className="qv-container qv-detail-stage">
   <figure className="qv-detail-figure"><div className="qv-detail-frame"><div className="qv-detail-image" ref={photo}>
    <img src={asset(art.strategy)} alt={t(text('工作室桌面的策略研究细节','Strategy research on the studio desk'))}/>
    {stacked?detailStops.map((stop,i)=><span key={i} className="qv-detail-number" style={{left:`${stop.x*100}%`,top:`${stop.y*100}%`}}>{i+1}</span>):<>
     <motion.span className="qv-detail-dimmer" animate={{background:`radial-gradient(circle ${geometry.lens*.85}px at ${geometry.cx}px ${geometry.cy}px,transparent 34%,rgba(8,8,10,.4) 62%,rgba(8,8,10,.66) 100%)`}} transition={transition}/>
     <motion.span className="qv-detail-register" aria-hidden="true" style={{width:geometry.lens/2,height:geometry.lens/2}} animate={{x:geometry.regionX,y:geometry.regionY}} transition={transition}><i/></motion.span>
     <motion.span className="qv-detail-leader" aria-hidden="true" animate={{x:geometry.lineX,y:geometry.lineY,rotate:geometry.angle,width:geometry.length}} transition={transition}/>
     <motion.div className="qv-detail-loupe" aria-hidden="true" style={{width:geometry.lens,height:geometry.lens}} animate={{x:geometry.lensX,y:geometry.lensY}} transition={transition}>
      <div className="qv-detail-loupe-window"><motion.img draggable={false} src={asset(art.strategy)} alt="" style={{width:size.width*2,height:size.height*2}} animate={{x:-geometry.regionX*2,y:-geometry.regionY*2}} transition={transition}/></div>
      <span className="qv-detail-tag">{t(text('细节','Detail'))} {String(active+1).padStart(2,'0')}/03</span>
     </motion.div>
    </>}
   </div></div><figcaption className="qv-detail-caption"><b>{t(text('图 01 · 策略研究','Fig. 01 · Strategy session'))}</b><span>{t(text('逐项梳理客户一周的工作','Mapping a client’s week, one note per task'))}</span><span>{t(text('工作室 · 旧金山 · 2026','Studio · San Francisco · 2026'))}</span></figcaption></figure>
   <div className="qv-detail-column"><SectionHeading eyebrow={text('03 · 仔细观察','03 · Look closer')} title={headings.detail}/>
    {!stacked&&<div className="qv-detail-current"><p className="qv-caption">{String(active+1).padStart(2,'0')} / 03 · {t(text('细节','Detail'))}</p><div className="qv-detail-statements">{details.map((detail,i)=><div key={i} className={active===i?'is-active':''} aria-hidden={active!==i}><h3>{t(detail.title)}</h3><p>{t(detail.body)}</p></div>)}</div></div>}
    <div className="qv-detail-navigation">{!stacked&&<div role="group" aria-label={t(text('取景细节','Details'))}>{details.map((detail,i)=><button key={i} type="button" aria-label={`${t(text('细节','Detail'))} ${i+1}: ${t(detail.title)}`} aria-pressed={active===i} onClick={()=>select(i)}><i/>{String(i+1).padStart(2,'0')}</button>)}</div>}<Link className="qv-text-link" href={href('process')}>{t(text('了解我们的流程','See how we work'))}</Link></div>
   </div>
   {stacked&&<ol className="qv-detail-crops">{details.map((detail,i)=><li key={i}><div className="qv-detail-crop" style={{'--detail-x':`${detailCropPosition(i).x*100}%`,'--detail-y':`${detailCropPosition(i).y*100}%`} as CSSProperties}><div><img draggable={false} src={asset(art.strategy)} alt={t(detail.title)}/></div><span className="qv-detail-tag">{t(text('细节','Detail'))} {String(i+1).padStart(2,'0')}/03</span></div><h3>{t(detail.title)}</h3><p>{t(detail.body)}</p></li>)}</ol>}
  </div></div>
 </section>
}
