import { recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const PDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true
})
const objectString = JSON.stringify(object, null, 2)
const PDASTString = JSON.stringify(PDAST, null, 2)
console.log("--------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 4")
console.log("--------------------------------------------------")
console.log('object', objectString)
console.log("PDASTString", PDASTString)