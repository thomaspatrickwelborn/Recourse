import { recursiveFreeze, recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: {
    propertyB: 2,
  }
}
object.propertyA.propertyC = object.propertyA
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: true,
  maxDepth: 5,
})
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
console.log("--------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 6")
console.log("--------------------------------------------------")
console.log('object', object)
console.log("objectPDASTString", objectPDASTString)