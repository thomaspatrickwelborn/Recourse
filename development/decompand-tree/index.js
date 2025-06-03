import regularExpressions from '../regular-expressions/index.js'
const Options = {
  values: false
}
export default function decompandTree($target, $options) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  const key = subpaths.pop()
  const target = (key && !isNaN(key)) ? [] : {}
  let subtarget = target
  let subpathIndex = 0
  iterateSubpaths: 
  while(subpathIndex < subpaths.length - 2) {
    const $subpath = keypaths[subpathIndex]
    if(isNaN($subpath)) { subtarget[$subpath] = {} }
    else { subtarget[$subpath] = {} }
    subtarget = subtarget[$subpath]
    subpathIndex++
  }
  subtarget[key] = $target
  return target
}