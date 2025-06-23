import typeOf from '../../type-of/index.js'
// Object Getter
function Getter(...$arguments) {
  const $target = $arguments[0]
  if(!['object', 'array'].includes(typeOf($target))) { return }
  if(typeOf($arguments[1]) === 'string') {
    const $property = $arguments[1]
    return $target[$property]
  }
  else {
    return $target
  }
}
// Object Setter
function Setter(...$arguments) {
  if(!['object', 'array'].includes(typeOf($arguments[0]))) { return }
  else if(typeOf($arguments[1]) === 'string') {
    const [$target, $property, $value] = $arguments
    $target[$property] = $value
    return $target[$property]
  }
  else {
    const [$target, $source] = $arguments
    iterateTargetEntries: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    iterateSourceEntries: 
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $target[$sourceKey] = $sourceValue
    }
    return $target
  }
}
// Object Deleter
function Deleter(...$arguments) {
  const [$target, $property] = $arguments
  if(!['object', 'array'].includes(typeOf($target))) { return }
  else if(typeOf($property) === 'string') {
    return delete $target[$property]
  }
  else {
    iterateTargetKeys: 
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey]
    }
    return undefined
  }
}
export { Getter, Setter, Deleter }