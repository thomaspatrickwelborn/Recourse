export default function setTreeNode($target, $path, $value) {
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
  subtarget[key] = $value
  return target
}