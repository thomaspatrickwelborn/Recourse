import entities from '../entities/index.js' 
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import { Cessors, Getters } from '../cessors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  ancestors: [],
  getters: [Getters.Object, Getters.Map], 
}
export default function valueOf($source, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const source = new Cessors(options.getters).cess($source, options)
  if(source === undefined) { throw [$source, source] }
  if(!options.ancestors.includes($source)) { options.ancestors.unshift($source) }
  const target = typedObjectLiteral(typeOf(source))
  const sourceEntries = entities($source, 'entries', Object.assign(options, { recurse: false }))
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    let sourceValue
    if(ObjectKeys.includes(typeOf($sourceValue))) {
      sourceValue = valueOf($sourceValue, options)
    }
    else { sourceValue = $sourceValue }
    if(options.ancestors.includes(sourceValue)) { continue iterateSourceEntries }
    try {
      target[$sourceKey] = sourceValue
    }
    catch($err) { console.error($err) }
  }
  return target
}