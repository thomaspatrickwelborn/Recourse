import typeOf from '../type-of/index.js'
import entities from '../entities/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  ancestors: [],
  getters: [Getters.Object, Getters.Map], 
}
export default function freeze($target, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const targetEntities = entities($target, 'entries', Object.assign(options, {
    recurse: false
  }))
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    if(ObjectKeys.includes(typeOf($propertyValue)/*typeOfPropertyValue*/)) {
      freeze($propertyValue, options)
    }
  }
  return Object.freeze($target)
}