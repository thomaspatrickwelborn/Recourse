| [➲ Recourse](../../README.md) | *`toString`* |
| :-- | :-- |

# `toString` Method
 - [`toString` Method Syntax](#toString-method-syntax)
 - [`toString` Examples](#toString-examples)

## `toString` Method Syntax
```
import * as Recourse from 'recourse'
Recourse.toString($source, $options)
```
### `$source` Argument
**Type**: `any`  
**Required**: `true`  
**Default**: `undefined`  
**Descript**:  
Some property becomes stringified JSON. 
### `$options` Argument
```
{
  space: 0,
  replacer: null,
}
```
#### `$options.space` Option
[`JSON.stringify`'s `space` argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#space)
#### `$options.replacer` Option
[`JSON.stringify`'s `replacer` argument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#replacer)

## `toString` Examples
### `toString` Example 1
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
const objectString = Recourse.toString(object, { space: 2, replacer: null })
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

### `toString` Example 2
```
const map = new Map([[0, 1], [1, 2], [2, 3]])
const mapString = Recourse.toString(map, { space: 2, replacer: null })
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

### `toString` Example 3
```
const map = new Map([
  [{ propertyA: "AAA" }, { propertyA: "AAA" }],
  [{ propertyB: "BBB" }, { propertyB: "BBB" }],
  [{ propertyC: "CCC" }, { propertyC: "CCC" }],
])
const mapString = Recourse.toString(map, { space: 2, replacer: null })
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