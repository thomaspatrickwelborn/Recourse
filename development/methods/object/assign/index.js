import typeOf from '../../../utilities/type-of/index.js'
import entities from '../entities/index.js'
import { ObjectKeys } from '../../../variables/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { PropertyAssigner } from '../../../tensors/property.js'
import isNumerable from '../../../utilities/is-numerable/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function assign($target, $options, ...$sources) {
  if(!$target) { return $target}
  const options = Options('object', 'assign', $options)
  const entityOptions = Options('object', 'entities', Object.assign({}, options, {
    entities: Object.assign(options.entities, { nonenumerable: true, enumerable: true }), 
    recurse: Object.assign(options.recurse, { depth: 0, maxDepth: 1 })
  }))
  const { assignments, /*entities,*/ recurse } = options
  try { recurse.depth++ } catch($err) { return $target }
  const tensorProxy = new TensorProxy(options)
  const typeOfTarget = typeOf($target)
  iterateSources: 
  for(const $source of $sources) {
    if(!ObjectKeys.includes(typeOf($source))) continue iterateSources
    const sourceEntries = entities($source, 'entries', entityOptions)
    iterateSourceEntries: 
    for(const [$sourcePropertyKey, $sourcePropertyDescriptor] of sourceEntries) {
        const $sourcePropertyValue = tensorProxy.get($source, $sourcePropertyKey)
        try { recurse.ancestors = $sourcePropertyValue } catch($err) { continue iterateSourceEntries }
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