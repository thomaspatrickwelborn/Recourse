import { recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  type: true, 
})
const objectString = JSON.stringify(object, null, 2)
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
console.log("--------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 3")
console.log("--------------------------------------------------")
console.log('object', objectString)
console.log("objectPDASTString", objectPDASTString)