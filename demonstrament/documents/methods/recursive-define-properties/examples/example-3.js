import { recursiveDefineProperties } from '/dependencies/recourse.js'
const objectAST = {
  "propertyA": {
    "value": {
      "0": {
        "value": {
          "propertyC": {
            "value": 3,
            "writable": true,
            "enumerable": true,
            "configurable": true
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true
      },
      "1": {
        "value": {
          "propertyC": {
            "value": 33,
            "writable": true,
            "enumerable": true,
            "configurable": true
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true
      },
      "2": {
        "value": {
          "propertyC": {
            "value": 333,
            "writable": true,
            "enumerable": true,
            "configurable": true
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true
      },
      "length": {
        "value": 3,
        "writable": true,
        "enumerable": false,
        "configurable": false
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true
  }
}
const object = recursiveDefineProperties({}, objectAST)
const objectString = JSON.stringify(object, null, 2)
const objectASTString = JSON.stringify(objectAST, null, 2)
console.log("---------------------------------------")
console.log("Recursive Define Properties | Example 3")
console.log("---------------------------------------")
console.log("objectASTString", objectASTString)
console.log('object', objectString)

