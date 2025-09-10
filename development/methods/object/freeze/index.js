import typeOf from '../../../utilities/type-of/index.js'
import entities from '../entities/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { ObjectKeys } from '../../../variables/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function freeze($target, $options = {}) {
  const options = Options('object', 'freeze', $options)
  const { recurse } = options
  const { ancestors, maxDepth } = recurse
  if(recurse.depth > maxDepth) { return } else { recurse.depth++ }
  const target = new TensorProxy(options).get($target)
  if(!ancestors.includes(target)) { ancestors.unshift(target) }
  const targetEntities = entities($target, 'entries', Object.assign(options, {
    recurse: false
  }))
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    if(ancestors.includes($propertyValue)) { continue iterateTargetEntities }
    else if(ObjectKeys.includes(typeOf($propertyValue))) {
      freeze($propertyValue, options)
    }
  }
  return Object.freeze($target)
}