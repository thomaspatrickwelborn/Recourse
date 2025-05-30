import { expandTree } from '/dependencies/recourse.js'
console.log("-----------------------")
console.log("Expand Tree | Example 1")
console.log("-----------------------")
const object = {
  propertyA: 1
}
const objectAST = expandTree(object, 'value')
const objectString = JSON.stringify(object, null, 2)
const objectASTString = JSON.stringify(objectAST, null, 2)
console.log("object", objectString)
console.log("objectAST", objectASTString)
console.log("pass", `{
  "propertyA": {
    "value": 1
  }
}` === objectASTString)