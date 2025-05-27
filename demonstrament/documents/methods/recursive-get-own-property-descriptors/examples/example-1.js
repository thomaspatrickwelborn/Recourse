import { recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: 1
}
const objectPropertyDescriptorAST = recursiveGetOwnPropertyDescriptors(object)
const objectString = JSON.stringify(object, null, 2)
const objectPropertyDescriptorASTString = JSON.stringify(objectPropertyDescriptorAST, null, 2)
console.log("--------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 1")
console.log("--------------------------------------------------")
console.log('object', objectString)
console.log("objectPropertyDescriptorASTString", objectPropertyDescriptorASTString)