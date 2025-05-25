# ➲&ensp;Recourse
## `expandTree` Method
Expand Object/Array property key/value pairs to abstract syntax tree (AST) where property values become AST Node property value. 
```
const object = {
  propertyA: {
    propertyB: {
      propertyC: 333
    },
    propertyD: 444
  },
  propertyE: [{
    propertyG: 777,
  }, {
    propertyG: 777777,
  },, {
    propertyG: 777777777,
  }]
}
const objectAST = expandTree(object, 'value')
console.log("object", object)
console.log("objectAST", objectAST)
```
*logs*  
```
object {
  "propertyA": {
    "propertyB": {
      "propertyC": 333
    },
    "propertyD": 444
  },
  "propertyE": [
    {
      "propertyG": 777
    },
    {
      "propertyG": 777777
    },
    {
      "propertyG": 777777777
    }
  ]
}
objectAST {
  "propertyA": {
    "value": {
      "propertyB": {
        "value": {
          "propertyC": {
            "value": 333
          }
        }
      },
      "propertyD": {
        "value": 444
      }
    }
  },
  "propertyE": {
    "value": [
      {
        "value": {
          "propertyG": {
            "value": 777
          }
        }
      },
      {
        "value": {
          "propertyG": {
            "value": 777777
          }
        }
      },
      {
        "value": {
          "propertyG": {
            "value": 777777777
          }
        }
      }
    ]
  }
}
```