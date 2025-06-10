import typeOf from '../type-of/index.js'
class Cessors extends EventTarget {
  constructor($cessors) {
    super()
    const cessors = Object.assign([], $cessors)
    Object.defineProperties(this, {
      'cess': { value: function cess() {
        let cessValue
        iterateAccessors: 
        for(const $cessor of cessors) {
          cessValue = $cessor(...arguments)
          if(cessValue !== undefined) { break iterateAccessors }
        }
        return cessValue
      } },
    })
  }
}
const Accessors = { default: function($target, $property) {
  if($property === undefined) { return $target }
  else { return $target[$property] }
} }
const Processors = { default: function() {
  if(typeOf(arguments[1]) === 'string') {
    const [$target, $property, $value, $options] = [...arguments]
    $target[$property] = $value
    return $target[$property]
  }
  else {
    let [$target, $value, $options] = [...arguments]
    return $value
  }
} }
const Deaccessors = { default: function($target, $property) {
  if($property === undefined) { delete $target[$property] }
  return
} }
export {
  Cessors,
  Accessors,
  Processors,
  Deaccessors,
}