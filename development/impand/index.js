import { Tensors, Getters } from '../tensors/index.js'
import getProperty from '../get-property/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import entities from '../entities/index.js'
const Options = {
  ancestors: [], 
  getters: [Getters.Object, Getters.Map],
  depth: 0, maxDepth: 10,
}
export default function impand($source, $property, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: $options.ancestors ? [...$options.ancestors] : []
  })
  const { ancestors, values } = options
  if(options.depth > options.maxDepth) { return typedObjectLiteral($source) } else { options.depth++ }
  const source = new Tensors(options.getters).cess($source, options)
  if(!ancestors.includes(source)) { ancestors.unshift(source) }
  const typeOfProperty = typeOf($property)
  let target = typedObjectLiteral($source)
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of entities(
    $source, 'entries', Object.assign({}, options, { recurse: false })
  )) {
    if(typeOfProperty === 'string') { target[$sourceKey] = getProperty($sourceValue, $property) }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue) }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impand(target[$sourceKey], $property)
    }
  }
  return target
}