import typeOf from '../../methods/type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
// Map Type Validator
const TypeValidator = ($target) => ($target instanceof Map)
// Map Getter
function Getter(...$arguments) {
  if($arguments.length === 1) {
    let [$receiver] = $arguments
    return Returner(this.returnValue, $receiver)
  }
  else {
    let [$receiver, $property] = $arguments
    return Returner(this.returnValue, $property, $receiver.get($property))
  }
}
// Map Setter
function Setter(...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $source] = $arguments
    $receiver.clear()
    const sourceEntries = $source.entries()
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of sourceEntries) {
      $receiver.set($sourceKey, $sourceValue)
    }
    return Returner(this.returnValue, $receiver)
  }
  else {
    let [$receiver, $property, $value] = $arguments
    $receiver.set($property, $value)
    return Returner(this.returnValue, $property, $receiver.get($property))
  }
}
// Map Deleter
function Deleter(...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $property] = $arguments
    return Returner(this.returnValue, $property, $receiver.delete($property))
  }
  else {
    let [$receiver] = $arguments
    return Returner(this.returnValue, $receiver.clear())
  } 
}
// Map Returner
function Returner($returnValue, ...$arguments) {
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
