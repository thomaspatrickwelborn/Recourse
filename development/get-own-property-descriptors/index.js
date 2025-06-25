import typeOf from '../type-of/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
import expand from '../expand/index.js'
import { ObjectKeys } from '../variables/index.js'
export default function getOwnPropertyDescriptors($target, $options) {
  const propertyDescriptors = {}
  const typeOfTarget = typeOf($target)
  if(['array', 'object'.].includes(typeOfTarget)) {
    iteratePropertyDescriptorEntries: 
    for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($target))) {
      const propertyDescriptor = getOwnPropertyDescriptor($target, $propertyKey, $options)
      if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor }
    } 
  }
  else {
    iteratePropertyDescriptorEntries: 
    for(const [$propertyKey, $propertyValue] of Array.from($target.entries())) {
      const typeOfPropertyValue = typeOf($propertyValue)
      const propertyValue = (ObjectKeys.includes(typeOfPropertyValue))
        ? getOwnPropertyDescriptors($target, $options) 
        : expand($property, ($value) => { value: }) <<<<
    }
  }
  return propertyDescriptors
}