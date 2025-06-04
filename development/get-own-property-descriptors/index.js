import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
import Options from './options.js'
export default function getOwnPropertyDescriptors($target, $options) {
  const propertyDescriptors = {}
  const options = Object.assign({}, Options, $options)
  if(options.depth >= options.maxDepth) { return propertyDescriptors }
  else { options.depth++ }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($target))) {
    const propertyDescriptor = getOwnPropertyDescriptor($target, $propertyKey, options)
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor }
  }
  return propertyDescriptors
}