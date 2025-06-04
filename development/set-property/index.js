import regularExpressions from '../regular-expressions/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import typeOf from '../type-of/index.js'
export default function setProperty() {
  const $target = arguments[0]
  const properties = (typeOf(arguments[1]) === 'string')
    ? { [arguments[1]]: arguments[2] }
    : arguments[1]
  iterateProperties: 
  for(const [$path, $value] of Object.entries(properties)) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    const key = subpaths.pop()
    let subtarget = $target
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      subtarget[$subpath] = subtarget[$subpath] || (
        isNaN($subpath) ? {} : []
      )
      subtarget = subtarget[$subpath]
    }
    subtarget[key] = $value
  }
  return $target
}