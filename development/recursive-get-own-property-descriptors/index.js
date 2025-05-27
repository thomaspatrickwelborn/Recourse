import recursiveGetOwnPropertyDescriptor from '../recursive-get-own-property-descriptor/index.js'
import Options from './options.js'
export default function recursiveGetOwnPropertyDescriptors($properties, $options) {
  const options = Object.assign({}, Options, $options)
  const propertyDescriptors = {}
  for(const $propertyKey of Object.keys(Object.getOwnPropertyDescriptors($properties))) {
    propertyDescriptors[$propertyKey] = recursiveGetOwnPropertyDescriptor($properties, $propertyKey, options)
  }
  return propertyDescriptors
}