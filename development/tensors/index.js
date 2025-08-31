import typeOf from '../methods/type-of/index.js'
import * as ObjectTensors from './object/index.js'
import * as MapTensors from './map/index.js'
// import * as SetTensors from './set/index.js'
const Getters = {
  Object: ObjectTensors.Getter, 
  Map: MapTensors.Getter, 
  // Set: SetTensors.Getter, 
}
const Setters = {
  Object: ObjectTensors.Setter, 
  Map: MapTensors.Setter, 
  // Set: SetTensors.Setter, 
}
const Deleters = {
  Object: ObjectTensors.Deleter, 
  Map: MapTensors.Deleter, 
  // Set: SetTensors.Deleter, 
}
const TypeValidators = {
  Object: ObjectTensors.TypeValidator, 
  Map: MapTensors.TypeValidator, 
  // Set: SetTensors.TypeValidator, 
}
const Returners = {
  Object: ObjectTensors.Returner, 
  Map: MapTensors.Returner, 
  // Set: SetTensors.TypeValidator, 
}
function Cess($tensors, ...$arguments) {
  const { returners, typeValidators } = this
  const [$target] = $arguments
  let tensorIndex = 0
  iterateTypeValidators: 
  for(const $typeValidator of typeValidators) {
    const returner = returners[tensorIndex]
    if($typeValidator($target)) { return $tensors[tensorIndex](returner, ...$arguments) }
    tensorIndex++
    if(tensorIndex === typeValidators.length) { throw new Error(null) }
  }
}
class TensorProxy extends EventTarget {
  constructor($options) {
    super()
    this.options = $options
    this.returners
  }
  get typeValidators() { return Object.defineProperty(this, 'typeValidators', {
    value: this.options.typeValidators
  })['typeValidators'] }
  get getters() {
    const getters = []
    for(const $getter of this.options.getters) { getters.push($getter.bind(this)) }
    return Object.defineProperty(this, 'getters', { value: getters })['getters']
  }
  get setters() {
    const setters = []
    for(const $setter of this.options.setters) { setters.push($setter.bind(this)) }
    return Object.defineProperty(this, 'setters', { value: setters })['setters']
  }
  get deleters() {
    const deleters = []
    for(const $deleter of this.options.deleters) { deleters.push($deleter.bind(this)) }
    return Object.defineProperty(this, 'deleters', { value: deleters })['deleters']
  }
  get returners() {
    const returners = []
    for(const $returner of this.options.returners) { returners.push($returner.bind(this)) }
    return Object.defineProperty(this, 'returners', { value: returners })['returners']
  }
  get get() { return Object.defineProperty(this, 'get', {
    value: Cess.bind(this, this['getters'])
  })['get'] }
  get set() { return Object.defineProperty(this, 'set', {
    value: Cess.bind(this, this['setters'])
  })['set'] }
  get delete() { return Object.defineProperty(this, 'delete', {
    value: Cess.bind(this, this['deleters'])
  })['delete'] }
}
export { TensorProxy, Getters, Setters, Deleters, Returners, TypeValidators }