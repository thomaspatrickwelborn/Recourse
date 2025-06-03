import * as Variables from '../variables/index.js'
// import * as PropertyPath from '../property-path/index.js'
import * as Tree from '../tree/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
export default function impandTree($target, $property) {
  const typeOfProperty = typeOf($property)
  const typeOfTarget = typeOf($target)
  if(
    !['string', 'function'].includes(typeOfProperty) ||
    !['array', 'object'].includes(typeOfTarget)
  ) { return $target }
  let target = typedObjectLiteral($target)
  iterateTargetEntries: 
  for(const [$targetKey, $targetValue] of Object.entries($target)) {
    if(typeOfProperty === 'string') { target[$targetKey] = Tree.get($property, $targetValue) }
    else if(typeOfProperty === 'function') { target[$targetKey] = $property($targetValue) }
    if(target[$targetKey] && typeof target[$targetKey] === 'object') {
      target[$targetKey] = impandTree(target[$targetKey], $property)
    }
  }
  return target
}