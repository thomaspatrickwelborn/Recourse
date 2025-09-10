import defineProperty from '../define-property/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function defineProperties($target, $propertyDescriptors, $options) {
  const options = Options('object', 'defineProperties', $options)
  for(const [$propertyKey, $propertyDescriptor] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, options)
  }
  return $target
}