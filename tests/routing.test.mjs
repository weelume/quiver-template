import {test} from 'node:test'
import assert from 'node:assert/strict'
import {alternateLocaleHref} from '../src/features/site-templates/catalog/quiver/routing.ts'
test('独立站双语切换保留深层路径与查询锚点',()=>{assert.equal(alternateLocaleHref('/work/astra-glow','','zh','?preview=1','#gallery'),'/en/work/astra-glow?preview=1#gallery');assert.equal(alternateLocaleHref('/en/work/astra-glow','/en','en','?preview=1','#gallery'),'/work/astra-glow?preview=1#gallery')})
test('宿主挂载根与英语单词片段不会被误替换',()=>{assert.equal(alternateLocaleHref('/preview/site/en/blog/turning-audiences','/preview/site/en','en'),'/preview/site/blog/turning-audiences');assert.equal(alternateLocaleHref('/preview/site/blog/turning-audiences','/preview/site','zh'),'/preview/site/en/blog/turning-audiences')})
test('英文首页返回中文根路径',()=>assert.equal(alternateLocaleHref('/en','/en','en'),'/'))
