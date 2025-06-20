import { Recourse, tensors, set, typeOf, variables } from '/dependencies/recourse.js'
const { Getters, Setters, Deleters } = tensors
console.log("------------------")
console.log("Assign | Example 2")
console.log("------------------")
const options = {}
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: new Map([["0", 5], ["1", 55], ["2", 555]])
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
          propertyE: { "0": "5", "1": 55, "2": "555" }
        }
      }]
    }
  }]
})
Recourse.assign(object, {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: { "0": "5", "1": 55, "2": "555" },
          propertyF: new Map([["0",5], ["1", "55"], ["2", 555], ["3", "5555"]]),
        }
      }]
    }
  }]
}, {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyF: { "0": 5, "1": "55", "2": 555, "3": "5555" }
        }
      }]
    }
  }]
})
const objectModifiedString = Recourse.toString(object, { space: 2, replacer: null })
console.log("object", object)
console.log("objectString", objectString)
console.log("objectModifiedString", objectModifiedString)
console.log("pass", (
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2', options) === "555") &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1', options) === 55) &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0', options) === "5") &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyF.3', options) === "5555") &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyF.2', options) === 555) &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyF.1', options) === "55") &&
  (Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyF.0', options) === 5)
))