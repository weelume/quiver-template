'use client'
import {useEffect,useRef,useState} from 'react'
import {motion,useReducedMotion,useScroll,useTransform} from 'framer-motion'
import {asset,text} from '../config'
import {useQuiver} from '../context'
import {reviews} from '../content/reviews'
import {headings} from '../content/headings'
import {ui} from '../content/ui'
import {SectionHeading} from './SectionHeading'
import './review-book.css'
type Review=typeof reviews[number]
function Client({review,index}:{review:Review;index:number}){const{t}=useQuiver();return <div className="qv-note-side"><p className="qv-caption">{String(index+1).padStart(2,'0')} / {String(reviews.length).padStart(2,'0')}</p><img src={asset(review.image)} alt={`${review.name}, ${t(review.role)}, ${review.client}`}/><h3>{review.name}</h3><p>{t(review.role)} · {review.client}</p><div className="qv-rating" role="img" aria-label={t(text('5 分评价','5 out of 5'))}>★★★★★</div><span className="qv-caption">{t(ui.measured)}</span><strong className="qv-note-metric">{t(review.metric)}</strong></div>}
export function Reviews(){
 const{t}=useQuiver(),[index,setIndex]=useState(0),[direction,setDirection]=useState(1),[phone,setPhone]=useState(false),reduce=useReducedMotion(),book=useRef<HTMLDivElement>(null),review=reviews[index]
 const{scrollYProgress}=useScroll({target:book,offset:['start 80%','start 40%']})
 const rotation=useTransform(scrollYProgress,[0,1],[0,-180]),shift=useTransform(scrollYProgress,[0,1],['-25%','0%']),under=useTransform(scrollYProgress,[.98,1],[0,1])
 useEffect(()=>{const query=window.matchMedia('(max-width:700px)'),update=()=>setPhone(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[])
 if(!review)return null
 const plain=phone||!!reduce,select=(next:number,dir:number)=>{setDirection(dir);setIndex((next+reviews.length)%reviews.length)},move=(amount:number)=>select(index+amount,amount)
 return <section className="qv-section qv-reviews"><div className="qv-container"><SectionHeading eyebrow={text('09 · 客户手记','09 · Client notes')} title={headings.reviews}/><div ref={book} className="qv-review-stack qv-review-book" role="group" aria-label={t(ui.clientNotes)} tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1)}else if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}}}>
  <motion.div className="qv-review-shift" style={{x:plain?0:shift}}>
   <motion.article key={review.name} className="qv-note-card" initial={{x:reduce?0:direction*34,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:reduce?0:.8,ease:[.2,.8,.2,1]}}>
    <motion.div className="qv-note-base-client" style={{opacity:plain?1:under}}><Client review={review} index={index}/></motion.div>
    <div className="qv-note-body"><blockquote>{t(review.quote)}</blockquote><div className="qv-note-signature"><p className="qv-caption">{t(ui.signed)}</p><svg className="qv-signature-draw" viewBox="0 0 360 80" role="img" aria-label={review.name}><text x="6" y="53">{review.name}</text><path d="M10 68Q120 58 322 64"/></svg></div><span className="qv-note-seal"><span>{t(ui.measured)}</span><strong>{t(review.metric)}</strong></span></div>
   </motion.article>
   {/* 开度取自书本进入视口的 80%→40% 区间；反向滚动按原路径合回封面。 */}
   {!plain&&<motion.div className="qv-review-cover" aria-hidden="true" inert style={{rotateY:rotation}}><div className="qv-review-cover-front"><span>Q</span><strong>{t(text('客户手记','Client notes'))}</strong><small>{t(text('{{brand}} · 工作室 · 始于 2021','{{brand}} · Studio · Since 2021'))}</small></div><div className="qv-review-cover-back"><Client review={review} index={index}/></div></motion.div>}
  </motion.div>
 </div><div className="qv-review-controls"><button type="button" disabled={reviews.length<2} aria-label={t(ui.previousNote)} onClick={()=>move(-1)}>←</button><div role="group" aria-label={t(ui.chooseNote)}>{reviews.map((item,i)=><button type="button" key={item.name} aria-label={`${item.name}, ${item.client}`} aria-pressed={i===index} onClick={()=>select(i,i>=index?1:-1)}><span/></button>)}</div><button type="button" disabled={reviews.length<2} aria-label={t(ui.nextNote)} onClick={()=>move(1)}>→</button></div><p className="qv-form-note">{t(ui.demoMetric)}</p></div></section>
}
