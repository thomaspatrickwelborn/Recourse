import typeOf from '../type-of/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
export default function getOwnPropertyDescriptors($target, $options) {
  const options = Object.assign({}, $options)
  const propertyDescriptors = {}
  const propertyDescriptorKeys = (['array', 'object'].includes(typeOf($target)))
    ? Object.keys(Object.getOwnPropertyDescriptors($target))
    : Array.from($target.keys())
  iteratePropertyDescriptorKeys: 
  for(const $propertyKey of propertyDescriptorKeys) {
    const propertyDescriptor = getOwnPropertyDescriptor($target, $propertyKey, options)
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor }
  }
  return propertyDescriptors
}