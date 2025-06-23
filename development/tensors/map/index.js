import typeOf from '../../type-of/index.js'
const returnValues = ['receiver', 'target', 'entry']
// Map Getter
function Getter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    let [$receiver, $property, $options] = $arguments
    $options = $options || { returnValue: 'target' }
    let { returnValue } = $options
    return (
      returnValue === 'target'
    ) ? $receiver.get($property)
      : (
      returnValue === 'receiver'
    ) ? $receiver[$property]
      : (
      returnValue === 'entry'
    ) ? [$property, $receiver.get($property)]
      : undefined
    // return (
    //   (!returnValues.includes(returnValue)) ? 'target' : returnValue
    // ) ? $receiver.get($property) : $receiver[$property]
  }
  else {
    let [$receiver, $options] = $arguments
    $options = $options || { returnValue: 'target' }
    let { returnValue } = $options
    return (
      returnValue === 'target'
    ) ? Object.fromEntries($receiver)
      : (
      returnValue === 'receiver'
    ) ? $receiver
      : (
      returnValue === 'entry'
    ) ? Array.from($receiver)
      : $receiver
    // return (
    //   (!returnValues.includes(returnValue)) ? 'target' : returnValue
    // ) ? Array.from($receiver.entries()) : $receiver
  }
}
// Map Setter
function Setter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    let [$receiver, $property, $value, $options] = $arguments
    $options = $options || { returnValue: 'target' }
    let { returnValue } = $options
    $receiver.set($property, $value, returnValue)
    return $receiver.get($property, returnValue)
  }
  else {
    let [$receiver, $source, $options] = $arguments
    $options = $options || { returnValue: 'target' }
    let { returnValue } = $options
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