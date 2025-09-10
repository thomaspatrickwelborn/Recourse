import typeOf from '../../../utilities/type-of/index.js'
import { ObjectKeys } from '../../../variables/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { PropertyAssigner } from '../../../tensors/property.js'
import entities from '../entities/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function assign($target, $options = {}, ...$sources) {
  if(!$target) { return $target}
  const options = Options('object', 'assign', $options)
  const { assignments } = options
  const tensorProxy = new TensorProxy(options)
  const typeOfTarget = typeOf($target)
  iterateSources: 
  for(const $source of $sources) {
    if(!ObjectKeys.includes(typeOf($source))) continue iterateSources
    const sourceEntries = entities($source, 'entries', Object.assign({}, options, { recurse: false }))
    iterateSourceEntries: 
    for(const [$sourcePropertyKey, $sourcePropertyValue] of sourceEntries) {
      const targetPropertyValue = tensorProxy.get($target, $sourcePropertyKey)
      const typeOfTargetPropertyValue = typeOf(targetPropertyValue)
      const typeOfSourcePropertyValue = typeOf($sourcePropertyValue)
      if(
        ObjectKeys.includes(typeOfSourcePropertyValue) &&
        ObjectKeys.includes(typeOfTargetPropertyValue) &&
        PropertyAssigner(
          assignments, $target, $sourcePropertyKey, $sourcePropertyValue
        ) === 'assign'
      ) {
        assign(targetPropertyValue, options, $sourcePropertyValue)
      }
      else {
        tensorProxy.set($target, $sourcePropertyKey, $sourcePropertyValue)
      }
    }
  }
  return $target
}