'use client'
import {useEffect,useRef,useState} from 'react'
import {ui} from '../content/ui'
import {useQuiver} from '../context'
/** 统计区使用照片放大镜；与机器人法线光照各自管理绘制与资源。 */
export function PhotoLens({src,label}:{src:string;label:string}){
 const{t}=useQuiver(),root=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null),point=useRef({x:.5,y:.5,inside:false}),paint=useRef<()=>void>(()=>{}),[error,setError]=useState(false),[attempt,setAttempt]=useState(0)
 useEffect(()=>{
  const element=canvas.current,container=root.current;if(!element||!container)return
  let cancelled=false,frame=0;const picture=new Image(),context=element.getContext('2d')
  const fail=(message:string)=>{if(cancelled)return;console.error('[quiver:lens] 照片放大镜未就绪',{src,message});setError(true)}
  setError(false)
  if(!context){fail('当前浏览器不能提供二维画布');return}
  const draw=()=>{if(cancelled||!picture.complete||!picture.naturalWidth)return;const rect=element.getBoundingClientRect(),w=rect.width,h=rect.height,ratio=Math.min(window.devicePixelRatio||1,2);if(!w||!h)return;const width=Math.round(w*ratio),height=Math.round(h*ratio);if(element.width!==width||element.height!==height){element.width=width;element.height=height}context.setTransform(ratio,0,0,ratio,0,0);context.clearRect(0,0,w,h);const scale=Math.max(w/picture.width,h/picture.height),dw=picture.width*scale,dh=picture.height*scale,dx=(w-dw)/2,dy=(h-dh)/2;context.drawImage(picture,dx,dy,dw,dh);if(point.current.inside){const r=Math.min(95,w*.19),zoom=2.2,px=point.current.x*w,py=point.current.y*h,half=r/(scale*zoom),sx=Math.max(half,Math.min(picture.width-half,(px-dx)/scale)),sy=Math.max(half,Math.min(picture.height-half,(py-dy)/scale));context.save();context.beginPath();context.arc(px,py,r,0,Math.PI*2);context.clip();context.drawImage(picture,sx-half,sy-half,half*2,half*2,px-r,py-r,r*2,r*2);context.restore();context.beginPath();context.arc(px,py,r,0,Math.PI*2);context.strokeStyle='rgba(255,255,255,.85)';context.lineWidth=1.2;context.stroke();context.beginPath();context.moveTo(px-8,py);context.lineTo(px+8,py);context.moveTo(px,py-8);context.lineTo(px,py+8);context.strokeStyle='rgba(255,255,255,.8)';context.stroke()}}
  paint.current=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(draw)}
  picture.onload=()=>{if(cancelled)return;paint.current();console.debug('[quiver:lens] 照片已就绪',{src})};picture.onerror=()=>fail('原始照片加载失败');picture.src=src
  const observer=new ResizeObserver(()=>paint.current());observer.observe(element)
  return()=>{cancelled=true;cancelAnimationFrame(frame);observer.disconnect();paint.current=()=>{}}
 },[src,attempt])
 return <div ref={root} className="qv-photo-lens" role="img" tabIndex={0} aria-label={label} onPointerMove={event=>{const r=event.currentTarget.getBoundingClientRect();point.current={x:(event.clientX-r.left)/r.width,y:(event.clientY-r.top)/r.height,inside:true};paint.current()}} onPointerLeave={()=>{point.current.inside=false;paint.current()}} onFocus={()=>{point.current.inside=true;paint.current()}} onBlur={()=>{point.current.inside=false;paint.current()}} onKeyDown={event=>{const delta=.04;if(event.key.startsWith("Arrow"))point.current.inside=true;if(event.key==='ArrowLeft')point.current.x=Math.max(0,point.current.x-delta);else if(event.key==='ArrowRight')point.current.x=Math.min(1,point.current.x+delta);else if(event.key==='ArrowUp')point.current.y=Math.max(0,point.current.y-delta);else if(event.key==='ArrowDown')point.current.y=Math.min(1,point.current.y+delta);else if(event.key==='Escape')point.current.inside=false;else return;event.preventDefault();paint.current()}}><canvas ref={canvas} aria-hidden="true"/>{error&&<div className="qv-visual-error" role="status"><p>{t(ui.visualError)}</p><button type="button" onClick={()=>setAttempt(value=>value+1)}>{t(ui.retry)}</button></div>}</div>
}
