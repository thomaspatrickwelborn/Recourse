import typedObjectLiteral from '../typed-object-literal/index.js'
import regularExpressions from '../regular-expressions/index.js'
function get($path, $source) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  const key = subpaths.pop()
  let subtarget = $source
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath] }
  return subtarget[key]
}
function set($path, $source) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  const key = subpaths.pop()
  const target = (key && !isNaN(key)) ? [] : {}
  let subtarget = target
  let subpathIndex = 0
  while(subpathIndex < subpaths.length - 2) {
    const $subpath = keypaths[subpathIndex]
    if(isNaN($subpath)) { subtarget[$subpath] = {} }
    else { subtarget[$subpath] = {} }
    subtarget = subtarget[$subpath]
    subpathIndex++
  }
  subtarget[key] = $source
  return target
}
export { get, set }