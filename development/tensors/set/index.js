import typeOf from '../../methods/type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
// Map Type Validator
const TypeValidator = ($target) => ($target instanceof Set)
// Map Getter
function Getter(...$arguments) {
  if($arguments.length === 1) {
    let [$receiver] = $arguments
    return $receiver
  }
  else {
    let [$receiver, $property] = $arguments
    return ($receiver.has($property)) ? $property : undefined
  }
}
// Map Setter
function Setter(...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $source] = $arguments
    $receiver.clear()
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
      $receiver.set($sourceKey, $sourceValue)
    }
    return $receiver
  }
  else {
    let [$receiver, $property, $value] = $arguments
    $receiver.set($property, $value)
    return $receiver.get($property)
  }
}
// Map Deleter
function Deleter(...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $property] = $arguments
    return $receiver.delete($property)
  }
  else {
    let [$receiver] = $arguments
    return $receiver.clear()
  } 
}
export { TypeValidator, Getter, Setter, Deleter }
