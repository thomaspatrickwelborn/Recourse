import isArrayLike from '../../methods/is-array-like/index.js'
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
    return Returner($target)
  }
  else {
    const [$target, $property] = $arguments
    return Returner($property, $target[$property])
  }
}
// Object Setter
function Setter(...$arguments) {
  const propertyAssignment = this.options.propertyAssignments[typeOf($arguments[0])]
  const isTargetArrayLike = isArrayLike($target, this.options.strict)
  if(['string', 'number'].includes(typeOf($arguments[1]))) {
    let [$target, $property, $value] = $arguments
    if(propertyAssignment === 'push' && isTargetArrayLike) {
      $property = $target.length
    }
    $target[$property] = $value
    return Returner($property, $target[$property])
  }
  else {
    const [$target, $source] = $arguments
    iterateTargetEntries: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    if(isTargetArrayLike) { $target.length = 0 }
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
      $target[$sourceKey] = $sourceValue
    }
    return Returner($target)
  }
}
// Object Deleter
function Deleter(...$arguments) {
  const [$target, $property] = $arguments
  if(['string', 'number'].includes(typeOf($property))) {
    delete $target[$property]
    return Returner($property, $target[$property])
  }
  else {
    iterateTargetKeys: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    return Returner($target)
  }
}
// Object Returner
function Returner(...$arguments) {
  return $arguments.at(-1)
}
export {
  TypeValidator, Getter, Setter, Deleter, Returner
}