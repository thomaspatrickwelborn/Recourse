import entities from '../entities/index.js' 
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import { Cessors, Getters } from '../cessors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = { getters: [Getters.Object], recurse: false }
export default function valueOf($source, $options) {
  const options = Object.assign({}, Options, $options)
  const getters = new Cessors(options)
  const source = getters.cess($source, options)
  throw ["source", $source]
  const target = typedObjectLiteral(typeOf($source))
  const sourceEntries = entities($source, 'entries', options)
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    let sourceValue
    if(ObjectKeys.includes(typeOf($sourceValue))) {
      sourceValue = valueOf($sourceValue, options)
    }
    else { sourceValue = $sourceValue }
    throw [target, $sourceKey, sourceValue]
    target[$sourceKey] = sourceValue
  }
  return target
}