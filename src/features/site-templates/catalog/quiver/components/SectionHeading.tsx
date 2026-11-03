'use client'
import type {Copy} from '../config'
import {useQuiver} from '../context'
import {EnterHeading} from './Motion'
export function SectionHeading({eyebrow,title,description,className=''}:{eyebrow?:Copy;title:Copy;description?:Copy;className?:string}){const{t}=useQuiver();return <div className={`qv-section-heading ${className}`}>{eyebrow&&<p className="qv-kicker">{t(eyebrow)}</p>}<EnterHeading>{t(title)}</EnterHeading>{description&&<p className="qv-section-intro">{t(description)}</p>}</div>}
