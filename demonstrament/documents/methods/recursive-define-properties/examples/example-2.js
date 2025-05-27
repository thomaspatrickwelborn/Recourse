import { recursiveDefineProperties } from '/dependencies/recourse.js'
const objectAST = {
  "propertyA": {
    "value": "1",
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "type": "number"
  }
}
const object = recursiveDefineProperties({}, objectAST, { typeCoercion: true })
const objectString = JSON.stringify(object, null, 2)
const objectASTString = JSON.stringify(objectAST, null, 2)
console.log("---------------------------------------")
console.log("Recursive Define Properties | Example 2")
console.log("---------------------------------------")
console.log("objectASTString", objectASTString)
console.log('object', objectString)

