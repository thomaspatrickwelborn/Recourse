import recursiveDefineProperty from '../recursive-define-property/index.js'
import Options from './options.js'
export default function recursiveDefineProperties($target, $propertyDescriptors, $options) {
  const options = Object.assign({}, Options, $options)
  for(const [
    $propertyKey, $propertyDescriptor
  ] of Object.entries($propertyDescriptors)) {
    recursiveDefineProperty($target, $propertyKey, $propertyDescriptor)
  }
  return $target
}