import { Recourse, Tensors, set, typeOf, variables } from '/dependencies/recourse.js'
const { Getters, Setters, Deleters } = Tensors
console.log("---------------------------")
console.log("Delete Property | Example 3")
console.log("---------------------------")
const options = {
  getters: [Getters.Object, Getters.Map],
  setters: [Setters.Object, Setters.Map],
  deleters: [Deleters.Object, Deleters.Map],
}
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: new Map([[0, 5], [1, 55], [2, 555]])
        }
      }]
    }
  }]
}
const objectString = JSON.stringify(object, null, 2)
Recourse.delete(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2', options)
Recourse.delete(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1', options)
Recourse.delete(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0', options)
const objectModifiedString = JSON.stringify(object, null, 2)
console.log("object", object)
console.log("objectString", objectString)
console.log("objectModifiedString", objectModifiedString)
console.log("pass", (
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2', options) === undefined) &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1', options) === undefined) &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0', options) === undefined)
))