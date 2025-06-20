import typeOf from '../../type-of/index.js'
// Map Getter
function Getter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    let [$receiver, $property, $options] = $arguments
    $options = $options || { returnTarget: true }
    let { returnTarget } = $options
    return (
      (typeOf(returnTarget) !== 'boolean') ? true : returnTarget
    ) ? $receiver.get($property) : $receiver[$property]
  }
  else {
    let [$receiver, $options] = $arguments
    $options = $options || { returnTarget: true }
    let { returnTarget } = $options
    return (
      (typeOf(returnTarget) !== 'boolean') ? true : returnTarget
    // ) ? Object.fromEntries($receiver.entries()) : $receiver
    ) ? Array.from($receiver.entries()) : $receiver
  }
}
// Map Setter
function Setter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    let [$receiver, $property, $value, $options] = $arguments
    $options = $options || { returnTarget: true }
    let { returnTarget } = $options
    returnTarget = (typeOf(returnTarget) !== 'boolean') ? true : returnTarget
    $receiver.set($property, $value, returnTarget)
    return $receiver.get($property, returnTarget)
  }
  else {
    let [$receiver, $source, $options] = $arguments
    $options = $options || { returnTarget: true }
    let { returnTarget } = $options
    returnTarget = (typeOf(returnTarget) !== 'boolean') ? true : returnTarget
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
  console.log($arguments)
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