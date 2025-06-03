import * as Variables from '../variables/index.js'
import getTreeNode from '../get-tree-node/index.js'
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
    if(typeOfProperty === 'string') { target[$targetKey] = Tree.getTreeNode($property, $targetValue) }
    else if(typeOfProperty === 'function') { target[$targetKey] = $property($targetValue) }
    if(target[$targetKey] && typeof target[$targetKey] === 'object') {
      target[$targetKey] = impandTree(target[$targetKey], $property)
    }
  }
  return target
}