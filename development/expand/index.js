import { ObjectKeys } from '../variables/index.js'
import setProperty from '../set-property/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
const Options = { nonenumerable: false }
const ValidPathTypes = ['string', 'function']
export default function expand($source, $path) {
  const typeOfPath = typeOf($path)
  const typeOfSource = typeOf($source)
  if(
    !ValidPathTypes.includes(typeOfPath) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source)
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    const targetValue = (
      ObjectKeys.includes(typeOf($sourceValue))
    ) ? expand($sourceValue, $path) : $sourceValue
    if(typeOfPath === ValidPathTypes[0]) {
      target[$sourceKey] = setProperty({}, $path, targetValue)
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue)
    }
  }
  return target
}