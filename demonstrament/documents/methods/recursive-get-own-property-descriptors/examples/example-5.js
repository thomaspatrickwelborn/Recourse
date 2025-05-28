import { recursiveFreeze, recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: {
    propertyB: 2,
  }
}
object.propertyA.propertyC = object.propertyA
// console.log(recursiveFreeze(object))
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: false,
})
console.log(objectPDAST)
const objectString = JSON.stringify(objectPDAST, null, 2)
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
console.log("--------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 5")
console.log("--------------------------------------------------")
console.log('object', object)
console.log("objectPDASTString", objectPDASTString)