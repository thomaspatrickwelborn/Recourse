| [➲ Recourse](../../README.md) | *`assignConcat`* |
| :-- | :-- |

# `assignConcat` Method
 - [`assignConcat` Method Syntax](#assignconcat-method-syntax)
 - [`assignConcat` Examples](#assignconcat-examples)

## `assignConcat` Method Syntax
```
Recourse.assignConcat($target, ...$sources)
```
## `assignConcat` Examples
### `assignConcat` Example 1
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
Recourse.assignConcat(object, {
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
*assignConcat*  
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

## `assignConcat` Example 2
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
Recourse.assignConcat(object, {
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
*assignConcat*  
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

## `assignConcat` Example 3
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
Recourse.assignConcat(object, {
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
*assignConcat*  
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