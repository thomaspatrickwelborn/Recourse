import { recursiveFreeze, recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: {
    propertyB: 2,
  },
  propertyC: {
    propertyD: 4
  }
}
object.propertyA.propertyC = object.propertyC
object.propertyC.propertyA = object.propertyA
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: false,
  maxDepth: 5,
})
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
console.log("--------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 7")
console.log("--------------------------------------------------")
console.log('object', object)
console.log("objectPDASTString", objectPDASTString)
console.log("pass", `{
  "propertyA": {
    "value": {
      "propertyB": {
        "value": 2,
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyB",
        "type": "number"
      },
      "propertyC": {
        "value": {
          "propertyD": {
            "value": 4,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.propertyC.propertyD",
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyC",
        "type": "object"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "object"
  },
  "propertyC": {
    "value": {
      "propertyD": {
        "value": 4,
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyC.propertyD",
        "type": "number"
      },
      "propertyA": {
        "value": {
          "propertyB": {
            "value": 2,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyC.propertyA.propertyB",
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyC.propertyA",
        "type": "object"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyC",
    "type": "object"
  }
}` === objectPDASTString)