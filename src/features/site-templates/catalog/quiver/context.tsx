'use client'
import {createContext,useContext} from 'react'
import {brand,type Copy} from './config'
import {useQuiverHost} from './host'
export const QuiverLocale=createContext<{locale:'zh'|'en';basePath:string}>({locale:'zh',basePath:''})
export function useQuiver(){const context=useContext(QuiverLocale),host=useQuiverHost();return{...context,t:(copy:Copy)=>copy[context.locale].replaceAll('{{brand}}',(host.brandName??brand.name)[context.locale]),href:(slug='')=>`${context.basePath}${slug?'/'+slug:''}`||'/'}}
