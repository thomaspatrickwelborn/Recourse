import { expandTree } from '/dependencies/recourse.js'
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = expandTree(object, 'value')
console.log("-----------------------")
console.log("Expand Tree | Example 5")
console.log("-----------------------")
console.log("object", JSON.stringify(object, null, 2))
console.log("objectAST", JSON.stringify(objectAST, null, 2))
