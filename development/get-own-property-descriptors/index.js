import typeOf from '../type-of/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
const Options = { returnValue: 'target' }
export default function getOwnPropertyDescriptors($source, $options = {}) {
  const options = Object.assign({}, Options, $options)
  const propertyDescriptors = (options.returnValue !== 'entries') ? {} : []
  const propertyDescriptorKeys = (['array', 'object'].includes(typeOf($source)))
    ? Object.keys(Object.getOwnPropertyDescriptors($source))
    : Array.from($source.keys())
  iteratePropertyDescriptorKeys: 
  for(const $propertyKey of propertyDescriptorKeys) {
    if($options.returnValue !== 'entries') {
      propertyDescriptors[$propertyKey] = getOwnPropertyDescriptor($source, $propertyKey, options)
    }
    else {
      propertyDescriptors.push(getOwnPropertyDescriptor($source, $propertyKey, options))
    }
  }
  return propertyDescriptors
}