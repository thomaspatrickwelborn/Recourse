import { TypeValidators, TensorProxy, Getters } from '../../tensors/index.js'
import { ObjectKeys } from '../../variables/index.js'
import entities from '../entities/index.js'
import typeOf from '../type-of/index.js'
import Options from '../../options/index.js'
export default function compand($source, $options) {
  const compandment = []
  const options = Options($options)
  const { ancestors, maxDepth } = options
  if(options.depth >= maxDepth) { return compandment }
  else { options.depth++ }
  const source = new TensorProxy(options).get($source)
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  const sourceEntries = entities($source, 'entries', Object.assign({}, options, { recurse: false }))
  iterateSourceProperties: 
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    compandment.push([$sourceKey, $sourceValue])
    if(
      typeof $sourceValue === 'object' &&
      $sourceValue !== null &&
      !Object.is($sourceValue, source) && 
      !ancestors.includes($sourceValue)
    ) {
      const subsourceEntries = compand($sourceValue, Object.assign({}, options, { recurse: false }))
      for(const [$subsourceKey, $subsourceValue] of subsourceEntries) {
        const path = [$sourceKey, $subsourceKey].join('.')
        compandment.push([path, $subsourceValue])
      }
    }
  }
  return compandment
}
