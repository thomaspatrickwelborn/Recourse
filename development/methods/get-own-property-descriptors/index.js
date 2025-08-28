import typeOf from '../type-of/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
import Options from '../../options/index.js'
export default function getOwnPropertyDescriptors($source, $options = {}) {
  const options = Options($options)
  const propertyDescriptors = {}
  const typeOfSource = typeOf($source)
  const propertyDescriptorKeys = (['array', 'object'].includes(typeOfSource))
    ? Object.keys(Object.getOwnPropertyDescriptors($source))
    : (typeOfSource == 'map')
    ? Array.from($source.keys())
    : []
  iteratePropertyDescriptorKeys: 
  for(const $propertyKey of propertyDescriptorKeys) {
    const propertyDescriptor = getOwnPropertyDescriptor($source, $propertyKey, options)
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor }
  }
  return propertyDescriptors
}