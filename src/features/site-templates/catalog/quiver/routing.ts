/** 语言前缀只在当前挂载根增删，保留内页、查询和锚点，避免误替换内容路径。 */
export function alternateLocaleHref(path:string,basePath:string,locale:'zh'|'en',search='',hash=''):string {
  const root=locale==='en'?basePath.replace(/\/en$/,''):basePath
  const suffix=path.slice(basePath.length)
  return `${root}${locale==='zh'?'/en':''}${suffix}${search}${hash}`||'/'
}
