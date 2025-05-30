import { recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
Object.seal(object.propertyA[0])
Object.freeze(object.propertyA[2])
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  frozen: true,
  sealed: true,
  path: true,
})
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
console.log("---------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 10")
console.log("---------------------------------------------------")
console.log("object", object)
console.log("objectPDASTString", objectPDASTString)
console.log("pass", `{
  "propertyA": {
    "value": {
      "0": {
        "value": {
          "propertyC": {
            "value": 3,
            "writable": true,
            "enumerable": true,
            "configurable": false,
            "path": "propertyA.0.propertyC",
            "frozen": true,
            "sealed": true
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.0",
        "frozen": false,
        "sealed": true
      },
      "1": {
        "value": {
          "propertyC": {
            "value": 33,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.1.propertyC",
            "frozen": true,
            "sealed": true
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.1",
        "frozen": false,
        "sealed": false
      },
      "2": {
        "value": {
          "propertyC": {
            "value": 333,
            "writable": false,
            "enumerable": true,
            "configurable": false,
            "path": "propertyA.2.propertyC",
            "frozen": true,
            "sealed": true
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.2",
        "frozen": true,
        "sealed": true
      },
      "length": {
        "value": 3,
        "writable": true,
        "enumerable": false,
        "configurable": false,
        "path": "propertyA.length",
        "frozen": true,
        "sealed": true
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "frozen": false,
    "sealed": false
  }
}` === objectPDASTString)