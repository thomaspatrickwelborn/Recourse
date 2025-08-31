import isMapLike from '../../methods/is-map-like/index.js'
import typeOf from '../../methods/type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
import { PropertyTransformer } from '../../tensors/property.js'
// Map Type Validator
const TypeValidator = ($target) => ($target instanceof Map)
// Map Getter
function Getter($returner, ...$arguments) {
  if($arguments.length === 1) {
    let [$receiver] = $arguments
    return $returner($receiver)
  }
  else {
    let [$receiver, $property] = $arguments
    return $returner($property, $receiver.get($property))
  }
}
// Map Setter
function Setter($returner, ...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $source] = $arguments
    $receiver.clear()
    const sourceEntries = $source.entries()
    iterateSourceEntries: 
    for(let [$sourceProperty, $sourceValue] of sourceEntries) {
      $sourceProperty = PropertyTransformer(
        this.options.propertyAssignments, $receiver.size, $target, $sourceProperty, $sourceValue
      )
      $receiver.set($sourceProperty, $sourceValue)
    }
    return $returner($receiver)
  }
  else {
    let [$receiver, $property, $value] = $arguments
    $property = PropertyTransformer(
      this.options.propertyAssignments, $receiver.size, $receiver, $property, $value
    )
    $receiver.set($property, $value)
    return $returner($property, $receiver.get($property))
  }
}
// Map Deleter
function Deleter($returner, ...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $property] = $arguments
    return $returner($property, $receiver.delete($property))
  }
  else {
    let [$receiver] = $arguments
    return $returner($receiver.clear())
  } 
}
// Map Returner
function Returner(...$arguments) {
  const { returnValue } = this.options 
  if($arguments.length === 1) {
    const [$value] = $arguments
    switch(returnValue) {
      case 'receiver': return $value
      case 'target': return $value.entries()
    }
  }
  else {
    const [$property, $value] = $arguments
    switch(returnValue) {
      case 'receiver': case 'target': return $value
    }
  }
}
export {
  TypeValidator, Getter, Setter, Deleter, Returner
}
