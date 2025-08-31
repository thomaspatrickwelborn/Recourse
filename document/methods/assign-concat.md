| [➲ Recourse](../../README.md) | *`assign`* |
| :-- | :-- |

# `assign` Method
 - [`assign` Method Syntax](#assignconcat-method-syntax)
 - [`assign` Examples](#assignconcat-examples)

## `assign` Method Syntax
```
Recourse.assign($target, $options, ...$sources)
```
## `assign` Examples
### `assign` Example 1
```
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: [5, 55, 555]
        }
      }]
    }
  }]
}
Recourse.assign(object, { propertyAssignments: { array: { primitive: 'push' } } }, {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: ["5", 55, "555"]
        }
      }]
    }
  }]
})
```
*assign*  
```
{
  "propertyA": [
    {
      "propertyB": {
        "propertyC": [
          {
            "propertyD": {
              "propertyE": [
                "5",
                55,
                "555"
              ]
            }
          }
        ]
      }
    }
  ]
}
```

## `assign` Example 2
```
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: new Map([["0", 5], ["1", 55], ["2", 555]])
        }
      }]
    }
  }]
}
Recourse.assign(object, { propertyAssignments: { array: { primitive: 'push' } } }, {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: { "0": "5", "1": 55, "2": "555" }
        }
      }]
    }
  }]
})
```
*assign*  
```
{
  "propertyA": [
    {
      "propertyB": {
        "propertyC": [
          {
            "propertyD": {
              "propertyE": {
                "0": "5",
                "1": 55,
                "2": "555"
              },
              "propertyF": {
                "0": 5,
                "1": "55",
                "2": 555,
                "3": "5555"
              }
            }
          }
        ]
      }
    }
  ]
}
```

## `assign` Example 3
```
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: new Map([["0", 5], ["1", 55], ["2", 555]])
        }
      }]
    }
  }]
}
Recourse.assign(object, { propertyAssignments: array: { primitive: 'push' } }, {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: new Map([["3",5], ["4", "55"], ["5", 555], ["6", "5555"]]),
        }
      }]
    }
  }]
})
```
*assign*  
```
{
  "propertyA": [
    {
      "propertyB": {
        "propertyC": [
          {
            "propertyD": {
              "propertyE": {
                "0": 5,
                "1": 55,
                "2": 555,
                "3": 5,
                "4": "55",
                "5": 555,
                "6": "5555"
              }
            }
          }
        ]
      }
    }
  ]
}
```