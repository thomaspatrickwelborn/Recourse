import { TensorProxy } from '../../../tensors/index.js'
import entities from '../entities/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function compand($source, $options) {
  const compandment = []
  const options = Options('object', 'compand', $options)
  const { recurse } = options
  const { ancestors, maxDepth } = recurse
  if(recurse.depth >= maxDepth) { return compandment }
  else { recurse.depth++ }
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
