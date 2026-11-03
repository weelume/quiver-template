import test from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'
import {readFile} from 'node:fs/promises'
const source=await readFile(new URL('../src/features/site-templates/catalog/quiver/booking.ts',import.meta.url),'utf8')
const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}})
const {availableDays,annualEstimate}=await import('data:text/javascript;base64,'+Buffer.from(outputText).toString('base64'))
test('PT 日期跨午夜并跳过周末，始终返回十个工作日',()=>{const days=availableDays(new Date('2026-11-07T02:00:00Z'));assert.equal(days.length,10);assert.equal(days[0],'2026-11-09');assert.equal(days.at(-1),'2026-11-20');assert.equal(new Set(days).size,10);assert.ok(days.every(day=>![0,6].includes(new Date(day+'T12:00:00Z').getUTCDay())))})
test('工时估算保持原站公式与零值边界',()=>{assert.equal(annualEstimate(80,52,45),187200);assert.equal(annualEstimate(0,52,45),0);assert.equal(annualEstimate(1,52,45),2340)})
