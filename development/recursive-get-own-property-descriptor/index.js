import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import recursiveGetOwnPropertyDescriptors from '../recursive-get-own-property-descriptors/index.js'
import Settings from '../recursive-get-own-property-descriptors/settings.js'
import Options from '../recursive-get-own-property-descriptors/options.js'
export default function recursiveGetOwnPropertyDescriptor($properties, $propertyKey, $options) {
  const options = Object.assign({}, Settings, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey)
  if(!options.ancestors.includes($properties)) { options.ancestors.unshift($properties) }
  if(!options.retrocursion && options.ancestors.includes(propertyDescriptor.value)) { return }
  if(options.path) {
    options.path = (typeOf(options.path) === 'string') ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey
    propertyDescriptor.path = options.path
  }
  if(options.type) { propertyDescriptor.type = typeOf(propertyDescriptor.value) }
  if(['array', 'object'].includes(typeOf(propertyDescriptor.value))) {
    propertyDescriptor.value = recursiveGetOwnPropertyDescriptors(propertyDescriptor.value, options)
  }
  return propertyDescriptor
}