import typeOf from '../../methods/type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
// Object Type Validator
const TypeValidator = ($target) => (
    !($target instanceof Map) &&
    ['array', 'object'].includes(typeof $target)
  )
// Object Getter
function Getter(...$arguments) {
  if($arguments.length === 1) {
    const [$target] = $arguments
    return Returner(this.returnValue, $target)
  }
  else {
    const [$target, $property] = $arguments
    return Returner(this.returnValue, $property, $target[$property])
  }
}
// Object Setter
function Setter(...$arguments) {
  if(['string', 'number'].includes(typeOf($arguments[1]))) {
    const [$target, $property, $value] = $arguments
    $target[$property] = $value
    return Returner(this.returnValue, $property, $target[$property])
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
    return Returner(this.returnValue, $target)
  }
}
// Object Deleter
function Deleter(...$arguments) {
  const [$target, $property] = $arguments
  if(['string', 'number'].includes(typeOf($property))) {
    delete $target[$property]
    return Returner(this.returnValue, $property, $target[$property])
  }
  else {
    iterateTargetKeys: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    return Returner(this.returnValue, $target)
  }
}
// Object Returner
function Returner($returnValue, ...$arguments) {
  return $arguments.at(-1)
}
export {
  TypeValidator, Getter, Setter, Deleter, Returner
}