import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Quiver · AI 智能体工作室', description: 'Quiver · AI 智能体工作室 responsive bilingual website' }
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body>{children}</body></html> }
