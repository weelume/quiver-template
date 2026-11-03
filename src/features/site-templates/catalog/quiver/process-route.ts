const corners=[[8,170],[585,170],[585,365],[155,365]] as const
const lengths=corners.slice(1).map((point,i)=>Math.hypot(point[0]-corners[i][0],point[1]-corners[i][1]))
const total=lengths.reduce((sum,length)=>sum+length,0)
export const processRoute=corners.map((point,i)=>`${i?'L':'M'}${point[0]} ${point[1]}`).join(' ')
/** 沿折线路径逐段推进，禁止把最后两个房间之间的移动插值为穿墙斜线。 */
export function processPoint(progress:number){
 let remaining=Math.max(0,Math.min(1,progress))*total
 for(let i=0;i<lengths.length;i++){
  if(remaining<=lengths[i]||i===lengths.length-1){const fraction=remaining/lengths[i];return{x:corners[i][0]+(corners[i+1][0]-corners[i][0])*fraction,y:corners[i][1]+(corners[i+1][1]-corners[i][1])*fraction}}
  remaining-=lengths[i]
 }
 return{x:corners[0][0],y:corners[0][1]}
}
