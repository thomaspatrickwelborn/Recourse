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
    const tensors = Object.assign([], $tensors)
    Object.defineProperties(this, {
      'cess': { value: function cess() {
        let cess
        iterateGetters: 
        for(const $tensor of tensors) {
          cess = $tensor(...arguments)
          if(cess !== undefined) { break iterateGetters }
        }
        return cess
      } },
    })
  }
}
export { Tensors, Getters, Setters, Deleters }