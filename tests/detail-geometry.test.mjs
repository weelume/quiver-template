import test from 'node:test'
import assert from 'node:assert/strict'
import {detailGeometry,detailIndex,detailCropPosition} from '../src/features/site-templates/catalog/quiver/detail-geometry.ts'
test('三段滚动覆盖独立区间，端点不越界',()=>assert.deepEqual([-.1,0,.32,.34,.66,.67,1,1.1].map(detailIndex),[0,0,0,1,1,2,2,2]))
test('手机方形裁切保持照片四边覆盖，不在首项左侧或末项底部留空',()=>{
 for(let i=0;i<3;i++){
  const p=detailCropPosition(i),left=.5-p.x*2.6,top=.5-p.y*(2.6/1.6297)
  assert.ok(left<=1e-8&&left+2.6>=1-1e-8)
  assert.ok(top<=1e-8&&top+2.6/1.6297>=1-1e-8)
 }
})
test('两倍窗口对应取景中心，左右引线都连接窗口边缘',()=>{
 for(const [w,h,tablet] of [[844.52,518.2,false],[738.67,453.25,true]])for(let i=0;i<3;i++){
  const g=detailGeometry(w,h,i,tablet)
  assert.ok(Math.abs((g.regionX+g.lens/4)-g.cx)<1e-8)
  assert.ok(Math.abs((g.regionY+g.lens/4)-g.cy)<1e-8)
  const endX=g.lineX+Math.cos(g.angle*Math.PI/180)*g.length,endY=g.lineY+Math.sin(g.angle*Math.PI/180)*g.length
  assert.ok(Math.abs(endX-(g.lensX>g.cx?g.lensX:g.lensX+g.lens))<1e-8)
  assert.ok(Math.abs(endY-(g.lensY+g.lens/2))<1e-8)
 }
})
