import typeOf from '../../type-of/index.js'
import * as Variables from '../../variables/index.js'
// Object Getter
function Getter($target, $property, $options) {
  if(!Variables.ObjectKeys.includes(typeOf($target))) { return }
  else if($property === undefined) { return $target }
  else { return $target[$property] }
}
// Object Setter
function Setter() {
  const $arguments = [...arguments]
  if(!Variables.ObjectKeys.includes(typeOf($arguments[0]))) { return }
  else if(typeOf($arguments[1]) === 'string') {
    const [$target, $property, $value, $options] = $arguments
    $target[$property] = $value
    return $target[$property]
  }
  else {
    const [$target, $source, $options] = $arguments
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
function Deleter($target, $property, $options) {
  const $arguments = [...arguments]
  if(!Variables.ObjectKeys.includes(typeOf($arguments[0]))) { return }
  else if(typeOf($arguments[1]) === 'string') {
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