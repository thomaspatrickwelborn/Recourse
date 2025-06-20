import typeOf from '../type-of/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map],
  delimiter: '.',
  depth: 0,
  frozen: false,
  nonenumerable: true,
  path: false,
  sealed: false,
  type: false,
}
export default function getOwnPropertyDescriptor($properties, $propertyKey, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors),
  })
  if(options.depth >= options.maxDepth) { return }
  else { options.depth++ }
  const propertyValue = new Tensors(options.getters).cess($properties, $propertyKey, options)
  if(propertyValue) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey)
    if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
    if(!options.ancestors.includes($properties)) { options.ancestors.unshift($properties) }
    if(options.ancestors.includes(propertyValue)) { return }
    if(options.path) {
      options.path = (
        typeOf(options.path) === 'string'
      ) ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey
      propertyDescriptor.path = options.path
    }
    if(options.type) { propertyDescriptor.type = typeOf(propertyValue) }
    if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyValue) }
    if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyValue) }
    if(ObjectKeys.includes(typeOf(propertyValue))) {
      propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue, options)
    }
    return propertyDescriptor
  }
}