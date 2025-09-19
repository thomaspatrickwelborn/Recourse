import typeOf from '../../../utilities/type-of/index.js'
import entities from '../entities/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { ObjectKeys } from '../../../variables/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function freeze($target, $options = {}) {
  const options = Options('object', 'freeze', $options)
  const { recurse } = options
  const { maxDepth } = recurse
  try { recurse.depth++ } catch($err) { return }
  const target = new TensorProxy(options).get($target)
  try { recurse.ancestors = target } catch($err) { return $target }
  const targetEntities = entities($target, 'entries', Object.assign({}, options, {
    recurse: { maxDepth: 1 }
  }))
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    try { recurse.ancestors = $propertyValue } catch($err) { continue iterateTargetEntities }
    if(ObjectKeys.includes(typeOf($propertyValue))) { freeze($propertyValue, options) }
  }
  return Object.freeze($target)
}