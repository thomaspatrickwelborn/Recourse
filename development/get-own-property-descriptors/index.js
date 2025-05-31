import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
import Settings from './settings.js'
import Options from './options.js'
export default function getOwnPropertyDescriptors($properties, $options) {
  const propertyDescriptors = {}
  const options = Object.assign({}, Settings, Options, $options)
  if(options.depth >= options.maxDepth) { return propertyDescriptors }
  else { options.depth++ }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($properties))) {
    const propertyDescriptor = getOwnPropertyDescriptor($properties, $propertyKey, options)
    if(propertyDescriptor !== undefined) { propertyDescriptors[$propertyKey] = propertyDescriptor }
  }
  return propertyDescriptors
}