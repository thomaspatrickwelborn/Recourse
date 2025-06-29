import typeOf from '../type-of/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
export default function getOwnPropertyDescriptors($source, $options = {}) {
  const options = Object.assign({}, $options)
  const propertyDescriptors = {}
  const propertyDescriptorKeys = (['array', 'object'].includes(typeOf($source)))
    ? Object.keys(Object.getOwnPropertyDescriptors($source))
    : Array.from($source.keys())
  iteratePropertyDescriptorKeys: 
  for(const $propertyKey of propertyDescriptorKeys) {
    const propertyDescriptor = getOwnPropertyDescriptor($source, $propertyKey, options)
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor }
  }
  return propertyDescriptors
}