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
          "propertyB": {
            "value": 2,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.propertyC.propertyB",
            "type": "number"
          },
          "propertyC": {
            "value": {
              "propertyB": {
                "value": 2,
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.propertyC.propertyC.propertyB",
                "type": "number"
              },
              "propertyC": {
                "value": {
                  "propertyB": {
                    "value": 2,
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.propertyC.propertyC.propertyC.propertyB",
                    "type": "number"
                  },
                  "propertyC": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.propertyC.propertyC.propertyC.propertyC",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.propertyC.propertyC.propertyC",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.propertyC.propertyC",
            "type": "object"
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
  }
}` === objectPDASTString)