import typeOf from '../type-of/index.js'
import * as ObjectTensors from './object/index.js'
import * as MapTensors from './map/index.js'
const Getters = {
  Object: ObjectTensors.Getter, 
  Map: MapTensors.Getter, 
}
const Setters = {
  Object: ObjectTensors.Setter, 
  Map: MapTensors.Setter, 
}
const Deleters = {
  Object: ObjectTensors.Deleter, 
  Map: MapTensors.Deleter, 
}
const TypeValidators = {
  Object: ObjectTensors.TypeValidator, 
  Map: MapTensors.TypeValidator, 
}
class Tensors extends EventTarget {
  constructor($tensors, $typeValidators) {
    super()
    Object.defineProperties(this, {
      'cess': { value: function next(...$arguments) {
        let tensorIndex = 0
        iterateTensors:
        for(const $tensor of $tensors) {
          if(tensorIndex >= $tensors.length) { break iterateTensors }
          const typeValidator = $typeValidators[tensorIndex]
          if(typeValidator($arguments[0])) {
            return $tensor(...$arguments)
          }
          tensorIndex++
        }
      } },
    })
  }
}
export { TypeValidators, Tensors, Getters, Setters, Deleters }