import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
export default function getOwnPropertyDescriptors($target, $options) {
  const propertyDescriptors = {}
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($target))) {
    const propertyDescriptor = getOwnPropertyDescriptor($target, $propertyKey, $options)
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor }
  }
  return propertyDescriptors
}