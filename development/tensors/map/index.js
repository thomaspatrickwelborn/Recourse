import typeOf from '../../type-of/index.js'
// Map Getter
function Getter() {
  const $arguments = [...arguments]
  if(typeOf($arguments[0]) !== 'map') { return }
  if(typeOf($arguments[$arguments.length - 1]) !== 'boolean') { $arguments.push(true) }
  // let length = 
  if($arguments.length === 3) {
    const [$receiver, $property, $returnTarget] = $arguments
    return ($returnTarget) ? $receiver.get($property) : $receiver[$property]
  }
  else if($arguments.length === 2) {
    const [$receiver, $returnTarget] = $arguments
    return ($returnTarget) ? Array.from($receiver.entries()) : $receiver
  }
}
// Map Setter
function Setter() {
  const $arguments = [...arguments]
  if(typeOf($arguments[0]) !== 'map') { return }
  const length = $arguments.length
  if(length === 3) {
    const [$receiver, $property, $value] = $arguments
    $receiver.set($property, $value)
    return $receiver.get($property)
  }
  else if(length === 2) {
    const [$receiver, $source] = $arguments
    $receiver.clear()
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $receiver.set($sourceKey, $sourceValue)
    }
    return $receiver
  }
}
// Map Deleter
function Deleter() {
  const $arguments = [...arguments]
  console.log($arguments)
  const length = $arguments.length
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(length === 2) {
    const [$receiver, $property] = $arguments
    return $receiver.delete($property)
  }
  else if(length === 1) {
    const [$receiver] = $arguments
    return $receiver.clear()
  } 
}
export { Getter, Setter, Deleter }