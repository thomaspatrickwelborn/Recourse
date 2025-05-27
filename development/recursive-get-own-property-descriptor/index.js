import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import recursiveGetOwnPropertyDescriptors from '../recursive-get-own-property-descriptors/index.js'
import Options from '../recursive-get-own-property-descriptors/options.js'
export default function recursiveGetOwnPropertyDescriptor($properties, $propertyKey, $options) {
  const options = Object.assign({}, Options, $options)
  const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey)
  if(options.type) { propertyDescriptor.type = typeOf(propertyDescriptor.value) }
  if(['array', 'object'].includes(typeOf(propertyDescriptor.value))) {
    propertyDescriptor.value = recursiveGetOwnPropertyDescriptors(propertyDescriptor.value, options)
  }
  return propertyDescriptor
}