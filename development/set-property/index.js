import regularExpressions from '../regular-expressions/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import typeOf from '../type-of/index.js'
export default function setProperty() {
  const $target = arguments[0]
  const properties = (typeOf(arguments[1]) === 'string')
    ? { [arguments[1]]: arguments[2] }
    : arguments[1]
  for(const [$path, $value] of Object.entries(properties)) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    const key = subpaths.pop()
    let subtarget = $target
    let subpathIndex = 0
    while(subpathIndex < subpaths.length) {
      const $subpath = subpaths[subpathIndex]
      if(isNaN($subpath)) { subtarget[$subpath] = {} }
      else { subtarget[$subpath] = {} }
      subtarget = subtarget[$subpath]
      subpathIndex++
    }
    subtarget[key] = $value
  }
  return $target
}