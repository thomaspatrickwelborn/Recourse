import typeOf from '../../type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
const Options = { returnValue: 'target' }
// Object Getter
function Getter(...$arguments) {
  if(!['object', 'array'].includes(typeOf($arguments[0]))) { return this?.next(...$arguments) }
  else if(['string', 'number'].includes(typeOf($arguments[1]))) {
    const [$target, $property, $options] = $arguments
    const { returnValue } = Object.assign({}, Options, $options)
    return (returnValue !== 'entries')
      ? $target[$property]
      : [$property, $target[$property]]
  }
  else {
    const [$target, $options] = $arguments
    const { returnValue } = Object.assign({}, Options, $options)
    return (returnValue !== 'entries')
      ? $target
      : Object.entries($target)
  }
}
// Object Setter
function Setter(...$arguments) {
  if(!['object', 'array'].includes(typeOf($arguments[0]))) { return this?.next(...$arguments) }
  else if(['string', 'number'].includes(typeOf($arguments[1]))) {
    const [$target, $property, $value] = $arguments
    $target[$property] = $value
    return $target[$property]
  }
  else {
    const [$target, $source] = $arguments
    iterateTargetEntries: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
      $target[$sourceKey] = $sourceValue
    }
    return $target
  }
}
// Object Deleter
function Deleter(...$arguments) {
  const [$target, $property] = $arguments
  if(!['object', 'array'].includes(typeOf($target))) { return this?.next(...$arguments) }
  else if(['string', 'number'].includes(typeOf($property))) {
    return delete $target[$property]
  }
  else {
    iterateTargetKeys: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    return undefined
  }
}
export { Getter, Setter, Deleter }