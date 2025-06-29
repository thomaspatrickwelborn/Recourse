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
    const tensors = $tensors.map(($tensor, $tensorIndex) => $tensor.bind({
      next: $tensors[$tensorIndex + 1]
    }))
    Object.defineProperties(this, {
      'cess': { value: function next() {
        try { return tensors[0](...arguments) }
        catch($err) { console.error($err) }
      } },
    })
  }
}
export { Tensors, Getters, Setters, Deleters }