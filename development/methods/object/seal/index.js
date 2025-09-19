import typeOf from '../../../utilities/type-of/index.js'
import entities from '../entities/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { ObjectKeys } from '../../../variables/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function seal($target, $options = {}) {
  const options = Options('object', 'seal', $options)
  const { recurse } = options
  try { recurse.depth++ } catch($err) { return }
  const target = new TensorProxy(options).get($target)
  try { recurse.ancestors = target } catch($err) {}
  const targetEntities = entities($target, 'entries', Object.assign({}, options, {
    recurse: { maxDepth: 1 }
  }))
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    try { recurse.ancestors = $propertyValue } catch($err) { continue iterateTargetEntities }
    if(ObjectKeys.includes(typeOf($propertyValue))) { seal($propertyValue, options) }
  }
  return Object.seal($target)
}