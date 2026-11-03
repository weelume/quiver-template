'use client'
import Link from 'next/link'
import type {SiteTemplatePageProps} from '../../../types'
import {text} from '../config'
import {useQuiver} from '../context'
import {Shell} from '../components/Shell'
import {PageIntro} from '../components/PageIntro'
function Content(){const{t,href}=useQuiver();return <PageIntro eyebrow={text('404 · 页面未找到','404 · Page not found')} title={text('这间房暂时没有开放','This room is not open.')} intro={text('请回到工作室首页，继续寻找你想了解的内容。','Return to the studio to find what you were looking for.')}><Link className="qv-button qv-button-dark" href={href()}>{t(text('返回首页','Back to the studio'))}</Link></PageIntro>}
export default function NotFound(props:SiteTemplatePageProps){return <Shell {...props}><Content/></Shell>}
