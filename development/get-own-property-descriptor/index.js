import typeOf from '../type-of/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map],
  delimiter: '.',
  depth: 0,
  frozen: false,
  maxDepth: 10,
  nonenumerable: true,
  path: false,
  sealed: false,
  type: false,
}
export default function getOwnPropertyDescriptor($source, $propertyKey, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors),
  })
  if(options.depth >= options.maxDepth) { return }
  else { options.depth++ }
  const propertyValue = new Tensors(options.getters).cess($source, $propertyKey, options)
  if(propertyValue !== undefined) {
    const typeOfSource = typeOf($source)
    const propertyDescriptor = (typeOfSource !== 'map')
      ? Object.getOwnPropertyDescriptor($source, $propertyKey)
      : { configurable: false, enumerable: true, value: propertyValue[1], writable: true }
    if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
    if(!options.ancestors.includes($source)) { options.ancestors.unshift($source) }
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
    if(typeOfSource !== 'map' && ObjectKeys.includes(typeOf(propertyValue))) {
      propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue, options)
    }
    else if(typeOfSource === 'map') {
      if(ObjectKeys.includes(typeOf(propertyValue[1]))) {
        propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue[1], options)
      }
      // else {
      //   propertyDescriptor.value = propertyValue
      // }
    }
    return (options.returnValue !== 'entries')
      ? propertyDescriptor
      : [$propertyKey, propertyDescriptor]
  }
}