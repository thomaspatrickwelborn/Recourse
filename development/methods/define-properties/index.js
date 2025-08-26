import defineProperty from '../define-property/index.js'
import Options from '../../options/index.js'
export default function defineProperties($target, $propertyDescriptors, $options) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  for(const [$propertyKey, $propertyDescriptor] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, options)
  }
  return $target
}