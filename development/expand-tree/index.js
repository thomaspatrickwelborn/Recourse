import { ObjectKeys } from '../variables/index.js'
import setTreeNode from '../set-tree-node/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
const Options = { nonenumerable: false }
const ValidPropertyTypes = ['string', 'function']
export default function expandTree($target, $property) {
  const typeOfProperty = typeOf($property)
  const typeOfTarget = typeOf($target)
  if(
    !ValidPropertyTypes.includes(typeOfProperty) ||
    !ObjectKeys.includes(typeOfTarget)
  ) { return $target }
  let target = typedObjectLiteral($target)
  iterateTargetEntries: 
  for(const [$targetKey, $targetValue] of Object.entries($target)) {
    const targetValue = (
      ObjectKeys.includes(typeOf($targetValue))
    ) ? expandTree($targetValue, $property) : $targetValue
    if(typeOfProperty === ValidPropertyTypes[0]) {
      target[$targetKey] = setTreeNode($property, targetValue)
    }
    else if(typeOfProperty === ValidPropertyTypes[1]) {
      target[$targetKey] = $property(targetValue)
    }
  }
  return target
}