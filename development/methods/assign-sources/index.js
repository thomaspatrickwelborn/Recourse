import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../../variables/index.js'
import { TensorProxy } from '../../tensors/index.js'
import entities from '../entities/index.js'
import Options from '../../options/index.js'
export default function assignSources($target, $type, ...$sources) {
  if(!$target) { return $target}
  const options = Object.assign({}, Options)
  const tensorProxy = new TensorProxy(options)
  const typeOfTarget = typeOf($target)
  iterateSources: 
  for(const $source of $sources) {
    if(!ObjectKeys.includes(typeOf($source))) continue iterateSources
    const sourceEntries = entities($source, 'entries', { recurse: false, })
    iterateSourceEntries: 
    for(const [$sourcePropertyKey, $sourcePropertyValue] of sourceEntries) {
      const targetPropertyValue = tensorProxy.get($target, $sourcePropertyKey)
      const typeOfTargetPropertyValue = typeOf(targetPropertyValue)
      const typeOfSourcePropertyValue = typeOf($sourcePropertyValue)
      if(typeOfTarget === 'array' && $type === 'assignConcat') {
        tensorProxy.set($target, $target.length, $sourcePropertyValue)
      }
      else if(
        ObjectKeys.includes(typeOfSourcePropertyValue) &&
        ObjectKeys.includes(typeOfTargetPropertyValue)
      ) {
        assignSources(targetPropertyValue, $type, $sourcePropertyValue)
      }
      else {
        tensorProxy.set($target, $sourcePropertyKey, $sourcePropertyValue)
      }
    }
  }
  return $target
}