import { Recourse, tensors, set, typeOf, variables } from '/dependencies/recourse.js'
const { Getters, Setters, Deleters } = tensors
console.log("------------------")
console.log("Assign | Example 1")
console.log("------------------")
const options = {}
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: [5, 55, 555]
        }
      }]
    }
  }]
}
const objectString = JSON.stringify(object, null, 2)
Recourse.assign(object, {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: ["5", 55, "555"]
        }
      }]
    }
  }]
})
const objectModifiedString = JSON.stringify(object, null, 2)
console.log("object", objectString)
console.log("objectModified", objectModifiedString)
console.log(`Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2')`, Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2'))
console.log("pass", (
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2') === "555") &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1') === 55) &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0') === "5")
))

// get($target)
// get($target, $options)
// get($target, $property)
// get($target, $property, $options)

// set($target, $value)
// set($target, $value, $options)
// set($target, $property, $value)
// set($target, $property, $value, $options)
