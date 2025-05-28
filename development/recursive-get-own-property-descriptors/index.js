import recursiveGetOwnPropertyDescriptor from '../recursive-get-own-property-descriptor/index.js'
import Settings from './settings.js'
import Options from './options.js'
export default function recursiveGetOwnPropertyDescriptors($properties, $options) {
  const propertyDescriptors = {}
  const options = Object.assign({}, Settings, Options, $options)
  if(options.depth > options.maxDepth) { return propertyDescriptors }
  else { options.depth++ }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($properties))) {
    const propertyDescriptor = recursiveGetOwnPropertyDescriptor($properties, $propertyKey, options)
    if(propertyDescriptor !== undefined) { propertyDescriptors[$propertyKey] = propertyDescriptor }
  }
  return propertyDescriptors
}