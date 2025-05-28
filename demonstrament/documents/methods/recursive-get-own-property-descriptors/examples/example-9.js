import { recursiveFreeze, recursiveGetOwnPropertyDescriptors } from '/dependencies/recourse.js'
const object = {
  propertyA: {},
}
object.propertyA.root = object // NO
object.propertyA.parent = object.propertyA // No
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: true,
  maxDepth: 5,
})
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
console.log("--------------------------------------------------")
console.log("Recursive Get Own Property Descriptors | Example 9")
console.log("--------------------------------------------------")
console.log('object', object)
console.log("objectPDASTString", objectPDASTString)
console.log("pass", `{
  "propertyA": {
    "value": {
      "root": {
        "value": {
          "propertyA": {
            "value": {
              "root": {
                "value": {
                  "propertyA": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.root.propertyA.root.propertyA",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.root.propertyA.root",
                "type": "object"
              },
              "parent": {
                "value": {
                  "root": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.root.propertyA.parent.root",
                    "type": "object"
                  },
                  "parent": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.root.propertyA.parent.parent",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.root.propertyA.parent",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.root.propertyA",
            "type": "object"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.root",
        "type": "object"
      },
      "parent": {
        "value": {
          "root": {
            "value": {
              "propertyA": {
                "value": {
                  "root": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.root.propertyA.root",
                    "type": "object"
                  },
                  "parent": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.root.propertyA.parent",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.parent.root.propertyA",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.parent.root",
            "type": "object"
          },
          "parent": {
            "value": {
              "root": {
                "value": {
                  "propertyA": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.parent.root.propertyA",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.parent.parent.root",
                "type": "object"
              },
              "parent": {
                "value": {
                  "root": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.parent.parent.root",
                    "type": "object"
                  },
                  "parent": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.parent.parent.parent",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.parent.parent.parent",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.parent.parent",
            "type": "object"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.parent",
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