'use client'
import {useEffect,useRef,useState} from 'react'
import {useReducedMotion,useScroll} from 'framer-motion'

/** 固定长章节复用原生滚动定位；手机及减少动态效果模式使用完整纵向内容。 */
export function useScrollChapter(count:number){
 const root=useRef<HTMLElement>(null),reduce=useReducedMotion(),[phone,setPhone]=useState(false)
 const{scrollYProgress}=useScroll({target:root,offset:['start start','end end']})
 useEffect(()=>{const query=window.matchMedia('(max-width:700px)'),update=()=>setPhone(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[])
 const seek=(index:number)=>{const node=root.current;if(!node)return;const start=node.getBoundingClientRect().top+window.scrollY,range=Math.max(0,node.offsetHeight-window.innerHeight);window.scrollTo({top:start+range*Math.min(count-1,Math.max(0,index))/Math.max(count-1,1),behavior:reduce?'auto':'smooth'})}
 return{root,progress:scrollYProgress,stacked:phone||!!reduce,seek}
}
