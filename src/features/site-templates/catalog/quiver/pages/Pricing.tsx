'use client'
import type {SiteTemplatePageProps} from '../../../types'
import {text} from '../config'
import {headings} from '../content/headings'
import {Shell} from '../components/Shell'
import {PageIntro} from '../components/PageIntro'
import {PricingCards} from '../components/PricingCards'
import {FAQ} from '../components/FAQ'
export default function Pricing(props:SiteTemplatePageProps){return <Shell {...props} commission><PageIntro eyebrow={text('价格','Pricing')} title={headings.pricingPage} intro={headings.pricingIntro}/><PricingCards/><FAQ/></Shell>}
