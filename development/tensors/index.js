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
  const {   typeValidators } = this
  const [$target] = $arguments
  let tensorIndex = 0
  iterateTypeValidators: 
  for(const $typeValidator of typeValidators) {
    if($typeValidator($target)) { return $tensors[tensorIndex](...$arguments) }
    tensorIndex++
    if(tensorIndex === typeValidators.length) { throw new Error(null) }
  }
}
class TensorProxy extends EventTarget {
  constructor($options) {
    super()
    this.options = $options
  }
  get returnValue() { return Object.defineProperty(this, 'returnValue', { value: this.options.returnValue })['returnValue'] }
  get returners() { return Object.defineProperty(this, 'returners', { value: this.options.returners.map(($returner) => $returner.bind(this)) })['returners'] }
  get typeValidators() { return Object.defineProperty(this, 'typeValidators', { value: this.options.typeValidators })['typeValidators'] }
  get getters() { return Object.defineProperty(this, 'getters', { value: this.options.getters.map(($getter) => $getter.bind(this)) })['getters'] }
  get setters() { return Object.defineProperty(this, 'setters', { value: this.options.setters.map(($setter) => $setter.bind(this)) })['setters'] }
  get deleters() { return Object.defineProperty(this, 'deleters', { value: this.options.deleters.map(($deleter) => $deleter.bind(this)) })['deleters'] }
  get get() { return Object.defineProperty(this, 'get', { value: Cess.bind(this, this['getters']) })['get'] }
  get set() { return Object.defineProperty(this, 'set', { value: Cess.bind(this, this['setters']) })['set'] }
  get delete() { return Object.defineProperty(this, 'delete', { value: Cess.bind(this, this['deleters']) })['delete'] }
}
export { TensorProxy, Getters, Setters, Deleters, Returners, TypeValidators }