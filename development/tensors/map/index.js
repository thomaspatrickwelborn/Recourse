import typeOf from '../../type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
// Map Getter
function Getter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return this?.next(...$arguments) }
  else if($arguments.length === 1) {
    let [$receiver] = $arguments
    return Object.fromEntries($receiver)
  }
  else {
    let [$receiver, $property] = $arguments
    return $receiver.get($property)
  }
}
// Map Setter
function Setter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return this?.next(...$arguments) }
  else if($arguments.length === 2) {
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
  const length = $arguments.length
  if(typeOf($arguments[0]) !== 'map') { return this?.next(...$arguments) }
  else if($arguments.length === 2) {
    let [$receiver, $property] = $arguments
    return $receiver.delete($property)
  }
  else {
    let [$receiver] = $arguments
    return $receiver.clear()
  } 
}
export { Getter, Setter, Deleter }
