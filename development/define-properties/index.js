import defineProperty from '../define-property/index.js'
export default function defineProperties($target, $propertyDescriptors, $options) {
  for(const [$propertyKey, $propertyDescriptor] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, $options)
  }
  return $target
}