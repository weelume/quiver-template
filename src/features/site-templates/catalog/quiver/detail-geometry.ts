/** 归一化的原站取景中心；局部窗口展示取景框范围的两倍图像。 */
export const detailStops=[{x:.085,y:.60,lx:.446,ly:.60},{x:.25,y:.24,lx:.611,ly:.24},{x:.56,y:.83,lx:.20,ly:.60}] as const
export function detailIndex(progress:number):number{return Math.min(detailStops.length-1,Math.max(0,Math.floor(progress*detailStops.length)))}
export function detailCropPosition(index:number){
 const stop=detailStops[Math.min(detailStops.length-1,Math.max(0,index))]
 const xMargin=.5/2.6,yMargin=.5/(2.6/1.6297)
 return{x:Math.max(xMargin,Math.min(1-xMargin,stop.x)),y:Math.max(yMargin,Math.min(1-yMargin,stop.y))}
}
export function detailGeometry(width:number,height:number,index:number,tablet=false){
 const stop=detailStops[Math.min(detailStops.length-1,Math.max(0,index))]
 const lens=width*(tablet?.332:.38),cx=width*stop.x,cy=height*stop.y
 const regionX=cx-lens/4,regionY=cy-lens/4,lensX=width*stop.lx-lens/2,lensY=height*stop.ly-lens/2
 const right=lensX>cx,lineX=cx+(right?lens/4:-lens/4),lineY=cy,endX=right?lensX:lensX+lens,endY=lensY+lens/2
 const dx=endX-lineX,dy=endY-lineY
 return{lens,cx,cy,regionX,regionY,lensX,lensY,lineX,lineY,length:Math.hypot(dx,dy),angle:Math.atan2(dy,dx)*180/Math.PI}
}
