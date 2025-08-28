import isMapLike from '../../methods/is-map-like/index.js'
import typeOf from '../../methods/type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
// Map Type Validator
const TypeValidator = ($target) => ($target instanceof Map)
// Map Getter
function Getter(...$arguments) {
  if($arguments.length === 1) {
    let [$receiver] = $arguments
    return Returner($receiver)
  }
  else {
    let [$receiver, $property] = $arguments
    return Returner($property, $receiver.get($property))
  }
}
// Map Setter
function Setter(...$arguments) {
  const propertyAssignment = this.options.propertyAssignments[typeOf($arguments[0])]
  const isTargetMapLike = isMapLike($target, this.options.strict)
  if($arguments.length === 2) {
    let [$receiver, $source] = $arguments
    $receiver.clear()
    const sourceEntries = $source.entries()
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of sourceEntries) {
      $receiver.set($sourceKey, $sourceValue)
    }
    return Returner($receiver)
  }
  else {
    let [$receiver, $property, $value] = $arguments
    if(propertyAssignment === 'push' && isTargetMapLike) {
      $property = $target.size
    }
    $receiver.set($property, $value)
    return Returner($property, $receiver.get($property))
  }
}
// Map Deleter
function Deleter(...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $property] = $arguments
    return Returner($property, $receiver.delete($property))
  }
  else {
    let [$receiver] = $arguments
    return Returner($receiver.clear())
  } 
}
// Map Returner
function Returner(...$arguments) {
  const { returnValue } = this.options 
  if($arguments.length === 1) {
    const [$value] = $arguments
    switch($returnValue) {
      case 'receiver': return $value
      case 'target': return $value.entries()
    }
  }
  else {
    const [$property, $value] = $arguments
    switch($returnValue) {
      case 'receiver': case 'target': return $value
    }
  }
}
export {
  TypeValidator, Getter, Setter, Deleter, Returner
}
