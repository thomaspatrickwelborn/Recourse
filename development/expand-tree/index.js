import { ObjectKeys } from '../variables/index.js'
import * as Tree from '../tree/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
const ValidPropertyTypes = ['string', 'function']
export default function expandTree($source, $property) {
  const typeOfProperty = typeOf($property)
  const typeOfSource = typeOf($source)
  if(
    !ValidPropertyTypes.includes(typeOfProperty) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source)
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    const sourceValue = (
      ObjectKeys.includes(typeOf($sourceValue))
    ) ? expandTree($sourceValue, $property) : $sourceValue
    if(typeOfProperty === ValidPropertyTypes[0]) {
      target[$sourceKey] = Tree.set($property, sourceValue)
    }
    else if(typeOfProperty === ValidPropertyTypes[1]) {
      target[$sourceKey] = $property(sourceValue)
    }
  }
  return target
}