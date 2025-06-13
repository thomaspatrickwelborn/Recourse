import { cessors, set, typeOf, variables } from '/dependencies/recourse.js'
const { Getters, Setters, Deleters } = cessors
console.log("------------------------")
console.log("Set Property | Example 1")
console.log("------------------------")
const options = {
  getters: [Getters.Object, Getters.Map],
  setters: [Setters.Object, Setters.Map],
  deleters: [Deleters.Object, Deleters.map],
}
const map = new Map([["propertyA", 1]])
set(map, "propertyB", 2, options)
set(map, "propertyC", new Map([["propertyD", 4]]), options)
set(map, "propertyE", new Map([["propertyF", new Map([["propertyG", 777]])]]), options)
console.log(map)
const object = new Object({ "propertyA": 1 })
set(object, "propertyB", 2, options)
set(object, "propertyC", new Object({
  "propertyD": 4
}), options)
set(object, "propertyE", new Object({
  "propertyF": new Object({
    "propertyG": 777
  })
}), options)
set(object, 'propertyH.propertyI.propertyJ', 101010, options)
console.log("object", object)