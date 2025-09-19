import { TensorProxy } from '../../../tensors/index.js'
import isNumerable from '../../../utilities/is-numerable/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function compand($source, $options) {
  const compandment = []
  const options = Options('object', 'compand', $options)
  const { entities, recurse } = options
  try { recurse.depth++ } catch($err) { return compandment }
  const tensor = new TensorProxy(options)
  const source = tensor.get($source)
  try { recurse.ancestors = $source } catch($err) { return compandment }
  const sourceDescriptors = Object.entries(Object.getOwnPropertyDescriptors(source))
  iterateSourceEntries: 
  for(let [$sourceKey, $sourceDescriptor] of sourceDescriptors) {
    if(isNumerable(entities, $sourceDescriptor)) {
      const $sourceValue = tensor.get($source, $sourceKey)
      try { recurse.ancestors = $sourceValue } catch($err) { continue iterateSourceEntries }
      compandment.push([$sourceKey, $sourceValue])
      if($sourceValue && typeof $sourceValue === 'object') {
        compandment.push(...compand($sourceValue, options))
      }
    }
  }
  return compandment
}