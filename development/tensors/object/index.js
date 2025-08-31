import isArrayLike from '../../methods/is-array-like/index.js'
import typeOf from '../../methods/type-of/index.js'
import typeOfClass from '../../methods/type-of-class/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
import { PropertyTransformer } from '../../tensors/property.js'
// Object Type Validator
const TypeValidator = ($target) => (
    !($target instanceof Map) &&
    ['array', 'object'].includes(typeof $target)
  )
// Object Getter
function Getter($returner, ...$arguments) {
  if($arguments.length === 1) {
    const [$target] = $arguments
    return $returner($target)
  }
  else {
    const [$target, $property] = $arguments
    return $returner($property, $target[$property])
  }
}
// Object Setter
function Setter($returner, ...$arguments) {
  if(['string', 'number'].includes(typeOf($arguments[1]))) {
    let [$target, $property, $value] = $arguments
    $property = PropertyTransformer(
      this.options.propertyAssignments, $target.length, ...$arguments
    )
    $target[$property] = $value
    return $returner($property, $target[$property])
  }
  else {
    const [$target, $source] = $arguments
    iterateTargetEntries: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    if(isTargetArrayLike) { $target.length = 0 }
    iterateSourceEntries: 
    for(let [$sourceProperty, $sourceValue] of Object.entries($source)) {
      $sourceProperty = PropertyTransformer(
        this.options.propertyAssignments, $target.length, $target, $sourceProperty, $sourceValue
      )
      $target[$sourceProperty] = $sourceValue
    }
    return $returner($target)
  }
}
// Object Deleter
function Deleter($returner, ...$arguments) {
  const [$target, $property] = $arguments
  if(['string', 'number'].includes(typeOf($property))) {
    delete $target[$property]
    return $returner($property, $target[$property])
  }
  else {
    iterateTargetKeys: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    return $returner($target)
  }
}
// Object Returner
function Returner(...$arguments) {
  return $arguments.at(-1)
}
export {
  TypeValidator, Getter, Setter, Deleter, Returner
}