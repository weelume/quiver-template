'use client'
import {useEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react'
import {motion,useReducedMotion,useScroll,useTransform} from 'framer-motion'
import './footer-reveal.css'

export function FooterReveal({enabled,children}:{enabled:boolean;children:ReactNode}){
 const root=useRef<HTMLDivElement>(null),content=useRef<HTMLDivElement>(null),reduce=useReducedMotion(),[peek,setPeek]=useState(0)
 const{scrollYProgress}=useScroll({target:root,offset:['start end','end end']}),shade=useTransform(scrollYProgress,[0,1],[.16,0])
 useEffect(()=>{
  const node=content.current;if(!node)return
  const update=()=>setPeek(enabled&&!reduce&&window.innerWidth>700?Math.min(node.getBoundingClientRect().height,window.innerHeight):0)
  const observer=new ResizeObserver(update);observer.observe(node);window.addEventListener('resize',update);update()
  return()=>{observer.disconnect();window.removeEventListener('resize',update)}
 },[enabled,reduce])
 // 等量留出占位，保持文档总高度；只在有上一层委托区遮挡的页面启用页脚揭幕。
 return <div ref={root} className={`qv-footer-reveal${peek?' is-active':''}`} style={{'--qv-footer-peek':`${peek}px`} as CSSProperties}><div ref={content} className="qv-footer-reveal-content">{children}{peek>0&&<motion.div className="qv-footer-reveal-shade" aria-hidden="true" style={{opacity:shade}}/>}</div>{peek>0&&<div className="qv-footer-reveal-space" aria-hidden="true"/>}</div>
}
