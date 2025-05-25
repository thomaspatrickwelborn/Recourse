import { expandTree } from '/dependencies/recourse.js'
const object = {
  propertyA: 1
}
const objectAST = expandTree(object, ($value) => {
  return { source: { value: $value } }
})
console.log("Expand Tree | Example 4")
console.log("object", JSON.stringify(object, null, 2))
console.log("objectAST", JSON.stringify(objectAST, null, 2))
