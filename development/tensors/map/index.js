import typeOf from '../../type-of/index.js'
const Options = { returnValue: 'target' }
// Map Getter
function Getter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    let [$receiver, $property, $options] = $arguments
    const options = Object.assign({}, Options, $options)
    let { returnValue } = options
    return (
      returnValue === 'target'
    ) ? $receiver.get($property)
      : (
      returnValue === 'receiver'
    ) ? $receiver[$property]
      : (
      returnValue === 'entries'
    ) ? [$property, $receiver.get($property)]
      : undefined
  }
  else {
    let [$receiver, $options] = $arguments
    const options = Object.assign({}, Options, $options)
    let { returnValue } = options
    return (
      returnValue === 'target'
    ) ? Object.fromEntries($receiver)
      : (
      returnValue === 'receiver'
    ) ? $receiver
      : (
      returnValue === 'entries'
    ) ? Array.from($receiver.entries())
      : undefined
  }
}
// Map Setter
function Setter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    let [$receiver, $property, $value, $options] = $arguments
    const options = Object.assign({}, Options, $options)

    let { returnValue } = options
    $receiver.set($property, $value, options)
    return $receiver.get($property, options)
  }
  else {
    let [$receiver, $source, $options] = $arguments
    const options = Object.assign({}, Options, $options)

    let { returnValue } = options
    $receiver.clear()
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $receiver.set($sourceKey, $sourceValue, options)
    }
    return $receiver
  }
}
// Map Deleter
function Deleter(...$arguments) {
  const length = $arguments.length
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(length === 2) {
    let [$receiver, $property] = $arguments
    return $receiver.delete($property)
  }
  else if(length === 1) {
    let [$receiver] = $arguments
    return $receiver.clear()
  } 
}
export { Getter, Setter, Deleter }