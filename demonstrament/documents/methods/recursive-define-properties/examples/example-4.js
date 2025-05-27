import { recursiveDefineProperties } from '/dependencies/recourse.js'
const objectAST = {
  "propertyA": {
    "value": {
      "0": {
        "value": {
          "propertyC": {
            "value": "3",
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "type": "object"
      },
      "1": {
        "value": {
          "propertyC": {
            "value": "33",
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "type": "object"
      },
      "2": {
        "value": {
          "propertyC": {
            "value": "333",
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "type": "object"
      },
      "length": {
        "value": 3,
        "writable": true,
        "enumerable": false,
        "configurable": false,
        "type": "number"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "type": "array"
  }
}
const object = recursiveDefineProperties({}, objectAST, { typeCoercion: true })
const objectString = JSON.stringify(object, null, 2)
const objectASTString = JSON.stringify(objectAST, null, 2)
console.log("---------------------------------------")
console.log("Recursive Define Properties | Example 4")
console.log("---------------------------------------")
console.log("objectASTString", objectASTString)
console.log('object', objectString)

