'use client'
import {brand} from '../config'
import {useQuiver} from '../context'
import {useQuiverHost} from '../host'
export function Brand({wordmark=false}:{wordmark?:boolean}){const{t}=useQuiver(),host=useQuiverHost();return <>{!wordmark&&(host.logo?<img className="qv-brand-logo" src={host.logo} alt=""/>:<span className="qv-brand-disc" aria-hidden="true">Q</span>)}<span>{t(host.brandName??brand.name)}</span></>}
