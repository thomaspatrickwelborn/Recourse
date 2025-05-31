import {
  defineProperties, getOwnPropertyDescriptors
} from '/dependencies/recourse.js'
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectString = JSON.stringify(object, null, 2)
const objectPDAST = getOwnPropertyDescriptors(object, {
  type: true, 
})
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
const objectDefinedProperties = defineProperties({}, objectPDAST, {
  typeCoercion: true, 
})
const objectDefinedPropertiesString = JSON.stringify(objectDefinedProperties, null, 2)
console.log("---------------------------------------------------")
console.log("Recourse | Get Own Property Descriptors | Example 3")
console.log("---------------------------------------------------")
console.log("objectPDASTString", objectPDASTString)
console.log('objectDefinedPropertiesString', objectDefinedPropertiesString)
console.log("pass", objectDefinedPropertiesString === objectString)