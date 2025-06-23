import entities from '../entities/index.js' 
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  ancestors: [], 
  depth: 0, maxDepth: 10,
  getters: [Getters.Object, Getters.Map], 
}
export default function valueOf($source, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const { ancestors, maxDepth } = options
  if(options.depth >= maxDepth) { return } else { options.depth++ }
  const source = new Tensors(options.getters).cess($source, options)
  if(source === undefined) { return }
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  const target = typedObjectLiteral(typeOf(source))
  const sourceEntries = entities($source, 'entries', { recurse: false })
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    let sourceValue
    if(ObjectKeys.includes(typeOf($sourceValue))) {
      if(ancestors.includes($sourceValue)) { continue iterateSourceEntries }
      sourceValue = valueOf($sourceValue, options)
    }
    else { sourceValue = $sourceValue }
    try {
      target[$sourceKey] = sourceValue
    }
    catch($err) { console.error($err) }
    // catch($err) { throw $err }
  }
  return target
}