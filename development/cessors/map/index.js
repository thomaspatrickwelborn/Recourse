import typeOf from '../../type-of/index.js'
// Map Getter
function Getter() {
  const $target = arguments[0]
  if(typeOf($target) !== 'map') { return }
  else if(typeOf(arguments[1]) === 'string') {
    const $property = arguments[1]
    return $target.get($property)
  }
  else {
    return Object.fromEntries($target)
  }
}
// Map Setter
function Setter() {
  const $arguments = [...arguments]
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    const [$target, $property, $value, $options] = $arguments
    $target.set($property, $value)
    return $target.get($property)
  }
  else {
    const [$target, $source, $options] = $arguments
    $target.clear()
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $target.set($sourceKey, $sourceValue)
    }
    return $target
  }
}
// Map Deleter
function Deleter() {
  const $arguments = [...arguments]
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(typeOf($arguments[1]) === 'string') {
    const [$target, $property, $options] = $arguments
    return $target.delete($property)
  }
  else {
    const [$target, $options] = $arguments
    return $target.clear()
  } 
}
export { Getter, Setter, Deleter }