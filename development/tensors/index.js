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
function Cess($tensorMethod, ...$arguments) {
  const { typeValidators } = this
  const tensors = this[$tensorMethod]
  const [$target] = $arguments
  let tensorIndex = 0
  iterateTypeValidators: 
  for(const $typeValidator of typeValidators) {
    if($typeValidator($target)) {
      return tensors[tensorIndex](...$arguments)
    }
    tensorIndex++
    if(tensorIndex === typeValidators.length) {
      throw new Error(null)
    }
  }
}
class TensorProxy extends EventTarget {
  constructor($options) {
    super()
    const {
      typeValidators, getters, setters, deleters
    } = $options
    Object.defineProperties(this, {
      'typeValidators': { value: typeValidators },
      'getters': { value: getters },
      'setters': { value: setters },
      'deleters': { value: deleters },
    })
  }
  get get() { return Object.defineProperty(this, 'get', { value: Cess.bind(this, 'getters') })['get'] }
  get set() { return Object.defineProperty(this, 'set', { value: Cess.bind(this, 'setters') })['set'] }
  get delete() { return Object.defineProperty(this, 'delete', { value: Cess.bind(this, 'deleters') })['delete'] }
}
export { TensorProxy, TypeValidators, Getters, Setters, Deleters }