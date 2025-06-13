import typeOf from '../../type-of/index.js'
// Map Getter
function Getter($target, $property, $options) {
  console.log(...arguments)
  if(typeOf($target) !== 'map') { return }
  else if($property === undefined) { return Object.fromEntries($target) }
  else {
    isNaN($property)
    return $target.get($property)
  }
}
// Map Setter
function Setter() {
  console.log(...arguments)
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
  console.log(...arguments)
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