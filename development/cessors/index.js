import typeOf from '../type-of/index.js'
import * as ObjectCessors from './object/index.js'
import * as MapCessors from './map/index.js'
class Cessors extends EventTarget {
  constructor($cessors) {
    super()
    const cessors = Object.assign([], $cessors)
    Object.defineProperties(this, {
      'cess': { value: function cess() {
        let cess
        iterateGetters: 
        for(const $cessor of cessors) {
          cess = $cessor(...arguments)
          if(cess !== undefined) { break iterateGetters }
        }
        return cess
      } },
    })
  }
}
const Getters = {
  Object: ObjectCessors.Getter, 
  Map: MapCessors.Getter, 
}
const Setters = {
  Object: ObjectCessors.Setter, 
  Map: MapCessors.Setter, 
}
const Deleters = {
  Object: ObjectCessors.Deleter, 
  Map: MapCessors.Deleter, 
}
export { Cessors, Getters, Setters, Deleters }