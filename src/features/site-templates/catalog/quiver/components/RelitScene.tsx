'use client'
import {useEffect,useRef,useState,type ReactNode} from 'react'
import {useReducedMotion} from 'framer-motion'

const vertex=`attribute vec2 aPosition;varying vec2 vUv;void main(){vUv=aPosition*.5+.5;gl_Position=vec4(aPosition,0.,1.);}`
const fragment=`precision mediump float;
varying vec2 vUv;uniform sampler2D uColor;uniform sampler2D uNormal;
uniform vec2 uFit;uniform vec2 uPointer;uniform vec2 uCenter;uniform vec3 uTint;
void main(){
 vec2 uv=(vUv-uCenter)/uFit+.5;
 if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.){gl_FragColor=vec4(0.);return;}
 vec4 base=texture2D(uColor,uv);
 vec3 normal=normalize(texture2D(uNormal,uv).rgb*2.-1.);
 vec3 light=normalize(vec3(uPointer.x*1.5,uPointer.y*1.3,1.15));
 float diffuse=max(dot(normal,light),0.);
 vec3 halfLight=normalize(light+vec3(0.,0.,1.));
 float spec=pow(max(dot(normal,halfLight),0.),42.);
 float rim=pow(1.-max(normal.z,0.),2.5);
 vec3 warm=vec3(1.,.89,.75);
 vec3 color=base.rgb*(.21+.73*diffuse)*mix(warm,uTint,.16)+spec*.31*warm+rim*.08*uTint;
 float fade=smoothstep(0.,.1,uv.y);
 gl_FragColor=vec4(color,base.a*fade);
}`

function shader(gl:WebGLRenderingContext,type:number,source:string){
 const object=gl.createShader(type)
 if(!object)throw new Error('无法创建光照着色器')
 gl.shaderSource(object,source);gl.compileShader(object)
 if(!gl.getShaderParameter(object,gl.COMPILE_STATUS)){const message=gl.getShaderInfoLog(object);gl.deleteShader(object);throw new Error('光照着色器编译失败：'+message)}
 return object
}
function image(source:string):Promise<HTMLImageElement>{return new Promise((resolve,reject)=>{const element=new Image();element.onload=()=>resolve(element);element.onerror=()=>reject(new Error('视觉素材加载失败：'+source));element.src=source})}

/** 参考站采用颜色图与法线图实时重照明；原生 WebGL 保留真实光照交互，不替换为静态截图。 */
export function RelitScene({colorMap,normalMap,tint=[.9,.65,.45],align='center',label,errorLabel,retryLabel,children,className=''}:{colorMap:string;normalMap:string;tint?:readonly[number,number,number];align?:'center'|'right';label:string;errorLabel:string;retryLabel:string;children?:ReactNode;className?:string}){
 const canvasRef=useRef<HTMLCanvasElement>(null),stageRef=useRef<HTMLDivElement>(null),pointer=useRef({x:0,y:0,inside:false}),tintRef=useRef(tint),reduce=useReducedMotion(),reduceRef=useRef(reduce)
 const[error,setError]=useState(false),[attempt,setAttempt]=useState(0),[ready,setReady]=useState(false)
 useEffect(()=>{tintRef.current=tint},[tint]);useEffect(()=>{reduceRef.current=reduce},[reduce])
 useEffect(()=>{
  const canvas=canvasRef.current,stage=stageRef.current
  if(!canvas||!stage)return
  let cancelled=false,frame=0,visible=true,observer:ResizeObserver|undefined,intersection:IntersectionObserver|undefined
  let gl:WebGLRenderingContext|null=null,program:WebGLProgram|null=null,buffer:WebGLBuffer|null=null
  const shaders:WebGLShader[]=[],textures:WebGLTexture[]=[]
  setError(false);setReady(false)
  const fail=(reason:unknown)=>{if(cancelled)return;console.error('[quiver:relight] 交互光照未能完成',{colorMap,normalMap,reason:reason instanceof Error?reason.message:String(reason)});setError(true);setReady(false)}
  const contextLost=(event:Event)=>{event.preventDefault();cancelAnimationFrame(frame);fail(new Error('图形上下文已丢失'))}
  canvas.addEventListener('webglcontextlost',contextLost)
  const start=async()=>{
   const[colorImage,normalImage]=await Promise.all([image(colorMap),image(normalMap)])
   if(cancelled)return
   gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false})
   if(!gl)throw new Error('当前浏览器无法提供 WebGL 光照上下文')
   const context=gl
   shaders.push(shader(context,context.VERTEX_SHADER,vertex),shader(context,context.FRAGMENT_SHADER,fragment))
   program=context.createProgram()
   if(!program)throw new Error('无法创建光照程序')
   for(const object of shaders)context.attachShader(program,object)
   context.linkProgram(program)
   if(!context.getProgramParameter(program,context.LINK_STATUS))throw new Error('光照程序链接失败：'+context.getProgramInfoLog(program))
   context.useProgram(program)
   buffer=context.createBuffer()
   if(!buffer)throw new Error('无法创建光照几何缓冲')
   context.bindBuffer(context.ARRAY_BUFFER,buffer);context.bufferData(context.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),context.STATIC_DRAW)
   const position=context.getAttribLocation(program,'aPosition');context.enableVertexAttribArray(position);context.vertexAttribPointer(position,2,context.FLOAT,false,0,0)
   for(const[index,picture]of[colorImage,normalImage].entries()){
    const texture=context.createTexture();if(!texture)throw new Error('无法创建视觉纹理')
    textures.push(texture);context.activeTexture(context.TEXTURE0+index);context.bindTexture(context.TEXTURE_2D,texture)
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL,true)
    context.texParameteri(context.TEXTURE_2D,context.TEXTURE_WRAP_S,context.CLAMP_TO_EDGE);context.texParameteri(context.TEXTURE_2D,context.TEXTURE_WRAP_T,context.CLAMP_TO_EDGE)
    context.texParameteri(context.TEXTURE_2D,context.TEXTURE_MIN_FILTER,context.LINEAR);context.texParameteri(context.TEXTURE_2D,context.TEXTURE_MAG_FILTER,context.LINEAR)
    context.texImage2D(context.TEXTURE_2D,0,context.RGBA,context.RGBA,context.UNSIGNED_BYTE,picture)
    context.uniform1i(context.getUniformLocation(program,index?'uNormal':'uColor'),index)
   }
   const fit=context.getUniformLocation(program,'uFit'),light=context.getUniformLocation(program,'uPointer'),center=context.getUniformLocation(program,'uCenter'),color=context.getUniformLocation(program,'uTint')
   context.uniform2f(center,align==='right'?.73:.5,.5)
   const resize=()=>{const rect=canvas.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(rect.width*ratio));canvas.height=Math.max(1,Math.round(rect.height*ratio));context.viewport(0,0,canvas.width,canvas.height);const scale=Math.min(canvas.width/colorImage.width,canvas.height/colorImage.height);context.uniform2f(fit,colorImage.width*scale/canvas.width,colorImage.height*scale/canvas.height)}
   resize();observer=new ResizeObserver(resize);observer.observe(canvas)
   intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0});intersection.observe(stage)
   const current={x:0,y:.2},paint=(time:number)=>{
    if(cancelled)return
    if(visible&&!document.hidden){
     const idle=reduceRef.current?{x:0,y:.2}:{x:Math.sin(time/4200)*.48,y:.28+Math.cos(time/5300)*.22},target=pointer.current.inside?pointer.current:idle
     current.x+=(target.x-current.x)*(reduceRef.current?1:.075);current.y+=(target.y-current.y)*(reduceRef.current?1:.075)
     context.uniform2f(light,current.x,current.y);context.uniform3fv(color,new Float32Array(tintRef.current));context.clearColor(0,0,0,0);context.clear(context.COLOR_BUFFER_BIT);context.drawArrays(context.TRIANGLES,0,6)
    }
    frame=requestAnimationFrame(paint)
   }
   frame=requestAnimationFrame(paint);setReady(true)
   console.debug('[quiver:relight] 纹理与光照已就绪',{colorMap,normalMap,reducedMotion:!!reduceRef.current})
  }
  void start().catch(fail)
  return()=>{cancelled=true;cancelAnimationFrame(frame);observer?.disconnect();intersection?.disconnect();canvas.removeEventListener('webglcontextlost',contextLost);if(gl){for(const texture of textures)gl.deleteTexture(texture);for(const object of shaders)gl.deleteShader(object);if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program)}}
 },[colorMap,normalMap,align,attempt])
 return <div ref={stageRef} className={`qv-relight ${className}`} data-relight-state={error?'error':ready?'ready':'loading'} onPointerMove={event=>{const rect=canvasRef.current?.getBoundingClientRect();if(!rect)return;pointer.current={x:Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1)),y:Math.max(-1,Math.min(1,1-(event.clientY-rect.top)/rect.height*2)),inside:true}}} onPointerLeave={()=>{pointer.current.inside=false}}>
  <canvas ref={canvasRef} aria-hidden="true"/><span className="qv-sr-only">{label}</span>
  {error&&<div className="qv-visual-error" role="status"><p>{errorLabel}</p><button type="button" onClick={()=>setAttempt(value=>value+1)}>{retryLabel}</button></div>}
  {children}
 </div>
}
