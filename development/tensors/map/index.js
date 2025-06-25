import typeOf from '../../type-of/index.js'
import { PrimitiveKeys } from '../../variables/index.js'
const Options = { returnValue: 'target' }
// Map Getter
function Getter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(PrimitiveKeys.includes(typeOf($arguments[1]))) {
    const [$receiver, $property, $options] = $arguments
    const { returnValue } = Object.assign({}, Options, $options)
    return (returnValue === 'target') ? $receiver.get($property)
    : (returnValue === 'receiver') ? $receiver[$property]
    : (returnValue === 'entries') ? [$property, $receiver.get($property)]
    : undefined
  }
  else {
    const [$receiver, $options] = $arguments
    const { returnValue } = Object.assign({}, Options, $options)
    return (returnValue === 'target') ? Object.fromEntries($receiver)
    : (returnValue === 'receiver') ? $receiver
    : (returnValue === 'entries') ? Array.from($receiver.entries())
    : undefined
  }
}
// Map Setter
function Setter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(PrimitiveKeys.includes(typeOf($arguments[1]))) {
    let [$receiver, $property, $value, $options] = $arguments
    const { returnValue } = Object.assign({}, Options, $options)
    $receiver.set($property, $value)
    return $receiver.get($property)
  }
  else {
    let [$receiver, $source, $options] = $arguments
    const { returnValue } = Object.assign({}, Options, $options)
    $receiver.clear()
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $receiver.set($sourceKey, $sourceValue)
    }
    return $receiver
  }
}
// Map Deleter
function Deleter(...$arguments) {
  const length = $arguments.length
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(PrimitiveKeys.includes(typeOf($arguments[1]))) {
    let [$receiver, $property, $options] = $arguments
    const { returnValue } = Object.assign({}, Options, $options)
    return $receiver.delete($property)
  }
  else {
    let [$receiver] = $arguments
    return $receiver.clear()
  } 
}
export { Getter, Setter, Deleter }