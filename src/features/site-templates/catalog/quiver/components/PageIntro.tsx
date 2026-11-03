'use client'
import Link from 'next/link'
import {type Copy,text} from '../config'
import {useQuiver} from '../context'
import {EnterHeading,Reveal} from './Motion'
export function PageIntro({title,intro,eyebrow,children}:{title:Copy;intro?:Copy;eyebrow:Copy;children?:React.ReactNode}){const{t,href}=useQuiver();return <section className="qv-page-intro qv-container"><p className="qv-kicker"><Link href={href()}>{t(text('工作室','Studio'))}</Link> · {t(eyebrow)}</p><EnterHeading level={1}>{t(title)}</EnterHeading>{intro&&<Reveal><p className="qv-lead">{t(intro)}</p></Reveal>}{children}</section>}
