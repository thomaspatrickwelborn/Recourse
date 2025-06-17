| [➲ Recourse](../../README.md) | *`valueOf`* |
| :-- | :-- |

# `valueOf` Method
 - [`valueOf` Method Syntax](#valueOf-method-syntax)
 - [`valueOf` Examples](#valueOf-examples)

## `valueOf` Method Syntax

## `valueOf` Examples
### `valueOf` Example 1
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
const objectValueOf = Recourse.valueOf(object, { space: 2, replacer: null })
```
*objectString*  
```
{
  "propertyA": [
    {
      "propertyB": {
        "propertyC": [
          {
            "propertyD": {
              "propertyE": [
                5,
                55,
                555
              ]
            }
          }
        ]
      }
    }
  ]
}
```

### `valueOf` Example 2
```
const map = new Map([[0, 1], [1, 2], [2, 3]])
const mapValueOf = Recourse.valueOf(map, { space: 2, replacer: null })
```
*mapString*  
```
[
  [
    0,
    1
  ],
  [
    1,
    2
  ],
  [
    2,
    3
  ]
]
```

### `valueOf` Example 3
```
const map = new Map([
  [{ propertyA: "AAA" }, { propertyA: "AAA" }],
  [{ propertyB: "BBB" }, { propertyB: "BBB" }],
  [{ propertyC: "CCC" }, { propertyC: "CCC" }],
])
const mapValueOf = Recourse.valueOf(map, { space: 2, replacer: null })
```
*mapString*  
```
[
  [
    {
      "propertyA": "AAA"
    },
    {
      "propertyA": "AAA"
    }
  ],
  [
    {
      "propertyB": "BBB"
    },
    {
      "propertyB": "BBB"
    }
  ],
  [
    {
      "propertyC": "CCC"
    },
    {
      "propertyC": "CCC"
    }
  ]
]
```