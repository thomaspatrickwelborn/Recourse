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
class Tensors extends EventTarget {
  constructor($tensors, $typeValidators) {
    super()
    Object.defineProperties(this, {
      'cess': { value: function(...$arguments) {
        const [$target] = $arguments
        let tensorIndex = 0
        iterateTypeValidators: 
        for(const $typeValidator of $typeValidators) {
          if($typeValidator($target)) {
            return $tensors[tensorIndex](...$arguments)
          }
          tensorIndex++
          if(tensorIndex === $typeValidators.length) {
            throw new Error(null)
          }
        }
      } },
    })
  }
}
export { Tensors, TypeValidators, Getters, Setters, Deleters }