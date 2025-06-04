import * as Variables from '../variables/index.js'
import getProperty from '../get-property/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
export default function impand($source, $property) {
  const typeOfProperty = typeOf($property)
  let target = typedObjectLiteral($source)
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    if(typeOfProperty === 'string') { target[$sourceKey] = getProperty($sourceValue, $property) }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue) }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impand(target[$sourceKey], $property)
    }
  }
  return target
}