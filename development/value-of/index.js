import entities from '../entities/index.js' 
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  ancestors: [], 
  depth: 0, maxDepth: 10,
  getters: [Getters.Object, Getters.Map], 
  returnValue: 'receiver',
}
export default function valueOf($source, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const { ancestors, maxDepth, returnValue } = options
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  // else { return $source }
  // if(returnValue === 'receiver') { return $source }
  if(options.depth >= maxDepth) { return } else { options.depth++ }
  const source = new Tensors(options.getters).cess($source, options)
  if(source === undefined) { return }
  const target = typedObjectLiteral(typeOf(source))
  const sourceEntries = entities($source, 'entries', Object.assign({}, options, {
    recurse: false
  }))
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    let sourceValue
    if(ObjectKeys.includes(typeOf($sourceValue))) {
      if(!ancestors.includes($sourceValue)) { ancestors.unshift($sourceValue) }
      else { continue iterateSourceEntries }
      sourceValue = valueOf($sourceValue, options)
    }
    else { sourceValue = $sourceValue }
    try {
      target[$sourceKey] = sourceValue
    }
    catch($err) { console.error($err) }
  }
  return target
}