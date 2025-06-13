import { toString, typeOf } from '/dependencies/recourse.js'
import * as Recourse from '/dependencies/recourse.js'
console.log("------------------")
console.log("Freeze | Example 2")
console.log("------------------")


const object = {
  propertyA: [{
    propertyB: {
      propertyC: [3, 33, 333]
    }
  }],
  propertyD: new Map(Object.entries({
    propertyE: new Map([[0, 5], [1, 55], [2, 555]])
  }))
}
try {
  object.propertyD.get('propertyE').set(0, "5")
  object.propertyD.get('propertyE').set(1, "55")
  object.propertyD.get('propertyE').set(2, "555")
} catch($err) { console.error($err) }
const objectString = toString(object, { replacer: null, space: 2 })
Recourse.freeze(object)
console.log(object)
console.log(objectString)
