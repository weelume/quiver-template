import test from 'node:test'
import assert from 'node:assert/strict'
import {processPoint} from '../src/features/site-templates/catalog/quiver/process-route.ts'
test('标记按走廊拐角推进，不从构建房间斜穿到运行房间',()=>{
 assert.deepEqual(processPoint(0),{x:8,y:170})
 assert.equal(processPoint(.6).x,585)
 assert.ok(processPoint(.6).y>170&&processPoint(.6).y<365)
 assert.equal(processPoint(.8).y,365)
 assert.ok(processPoint(.8).x<585&&processPoint(.8).x>155)
 assert.deepEqual(processPoint(1),{x:155,y:365})
 assert.deepEqual(processPoint(-1),processPoint(0))
 assert.deepEqual(processPoint(2),processPoint(1))
})
