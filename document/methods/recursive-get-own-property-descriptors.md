| [⁘ Recourse](../../README.md) | *`recursiveGetOwnPropertyDescriptors`* |
| :-- | :-- |

# `recursiveGetOwnPropertyDescriptors`
Expand Object/Array property key/value pairs to abstract syntax tree (AST) where *source* property values become AST Node *target* property values. 

## Syntax
```
recursiveGetOwnPropertyDescriptors($source, $options)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Object/Array property key/value pairs expand to AST.  
### `$options` Argument
**Type**: `object`  
```
{ type: false }
```
#### `$options.type`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: When `$options.type` type is:  
 - `true`: Property descriptor value's `type` stored.  
 - `false`: **No** property desccriptor value's `type` stored. 
## `recursiveGetOwnPropertyDescriptors` Examples
### `recursiveGetOwnPropertyDescriptors` Example 1
```
const object = {
  propertyA: 1
}
const objectPropertyDescriptorAST = recursiveGetOwnPropertyDescriptors(object)
```
*objectAST*  
```
{
  "propertyA": {
    "value": 1,
    "writable": true,
    "enumerable": true,
    "configurable": true
  }
}
```
### `recursiveGetOwnPropertyDescriptors` Example 2
```
const objectPropertyDescriptorAST = recursiveGetOwnPropertyDescriptors(object, { type: true })
const objectPropertyDescriptorASTString = JSON.stringify(objectPropertyDescriptorAST, null, 2)
```
*objectAST*  
```
{
  "propertyA": {
    "value": 1,
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "type": "number"
  }
}
```

### `recursiveGetOwnPropertyDescriptors` Example 3
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = recursiveGetOwnPropertyDescriptors(object)
```
*objectAST*  
```
{
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
```


### `recursiveGetOwnPropertyDescriptors` Example 4
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = recursiveGetOwnPropertyDescriptors(object, { type: true })
```
*objectAST*  
```
{
  "propertyA": {
    "value": {
      "0": {
        "value": {
          "propertyC": {
            "value": 3,
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
            "value": 33,
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
            "value": 333,
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
```
