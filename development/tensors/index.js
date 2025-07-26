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
class Tensors extends EventTarget {
  constructor($tensors) {
    super()
    Object.defineProperties(this, {
      'cess': { value: function next() {
        iterateTensors:
        for(const $tensor of $tensors) {
          try { return $tensor(...arguments) }
          catch($err) {}
        }
      } },
    })
  }
}
export { Tensors, Getters, Setters, Deleters }