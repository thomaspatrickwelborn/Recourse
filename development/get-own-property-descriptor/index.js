import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import Settings from '../get-own-property-descriptors/settings.js'
import Options from '../get-own-property-descriptors/options.js'
export default function getOwnPropertyDescriptor($properties, $propertyKey, $options) {
  const options = Object.assign({}, Settings, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey)
  if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
  if(!options.ancestors.includes($properties)) { options.ancestors.unshift($properties) }
  if(options.ancestors.includes(propertyDescriptor.value)) { return }
  if(options.path) {
    options.path = (typeOf(options.path) === 'string') ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey
    propertyDescriptor.path = options.path
  }
  if(options.type) { propertyDescriptor.type = typeOf(propertyDescriptor.value) }
  if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyDescriptor.value) }
  if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyDescriptor.value) }
  if(['array', 'object'].includes(typeOf(propertyDescriptor.value))) {
    propertyDescriptor.value = getOwnPropertyDescriptors(propertyDescriptor.value, options)
  }
  return propertyDescriptor
}