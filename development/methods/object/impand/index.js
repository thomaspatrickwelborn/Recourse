import { TensorProxy } from '../../../tensors/index.js'
import getProperty from '../../map/get-property/index.js'
import typeOf from '../../../utilities/type-of/index.js'
import typedObjectLiteral from '../../../utilities/typed-object-literal/index.js'
import entities from '../entities/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function impand($source, $property, $options = {}) {
  const options = Options('object', 'impand', $options)
  const { recurse, resemble, strict } = options
  const { ancestors, maxDepth } = recurse
  if(recurse.depth > maxDepth) { return } else { recurse.depth++ }
  const source = new TensorProxy(options).get($source)
  if(!ancestors.includes(source)) { ancestors.unshift(source) }
  const typeOfProperty = typeOf($property)
  let target = typedObjectLiteral($source, { resemble, strict })
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of entities(
    $source, 'entries', Object.assign({}, options, { recurse: { maxDepth: 1 } })
  )) {
    if(typeOfProperty === 'string') { target[$sourceKey] = getProperty($sourceValue, $property) }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue) }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impand(target[$sourceKey], $property)
    }
  }
  return target
}