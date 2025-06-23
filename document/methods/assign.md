| [➲ Recourse](../../README.md) | *`assign`* |
| :-- | :-- |

# `assign` Method
 - [`assign` Method Syntax](#assign-method-syntax)
 - [`assign` Examples](#assign-examples)

## `assign` Method Syntax
```
Recourse.assign($target, ...$sources)
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
Recourse.assign(object, {
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
Recourse.assign(object, {
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