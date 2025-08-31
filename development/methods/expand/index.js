import { ObjectKeys } from '../../variables/index.js'
import setProperty from '../set-property/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import entities from '../entities/index.js'
import Options from '../../options/index.js'
const ValidPathTypes = ['string', 'function']
export default function expand($source, $path, $options = {}) {
  const options = Options($options)
  const { resemble, strict } = options
  const typeOfPath = typeOf($path)
  const typeOfSource = typeOf($source)
  if(
    !ValidPathTypes.includes(typeOfPath) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source, { resemble, strict })
  const sourceEntries = entities(
    $source, 'entries', Object.assign({}, options, { recurse: false })
  )
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    const targetValue = (ObjectKeys.includes(typeOf($sourceValue)))
      ? expand($sourceValue, $path, options)
      : $sourceValue
    if(typeOfPath === ValidPathTypes[0]) {
      target[$sourceKey] = setProperty({}, $path, targetValue, options)
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue)
    }
  }
  return target
}