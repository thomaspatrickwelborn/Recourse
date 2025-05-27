| [➲ Recourse](../../README.md) | *`recursiveDefineProperties`* |
| :-- | :-- |

# `recursiveDefineProperties`
Returns object/array property descriptor abstract syntax tree (PDAST).  

## Syntax
```
import { recursiveDefineProperties } from 'recourse'
recursiveDefineProperties($target, $propertyDescriptors, $options)
```
### `$target` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Property definition target.  
### `$propertyDescriptors` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Property descriptors.  
### `$options` Argument
**Type**: `object`  
```
{ typeCoercion: false }
```
#### `$options.typeCoercion`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: When `$options.typeCoercion` is:  
 - `true`: Property descriptor value stored as type.  
 - `false`: Property descriptor value stored as provided. 
## `recursiveDefineProperties` Examples
### `recursiveDefineProperties` Example 1
```
const object = recursiveDefineProperties({}, {
  "propertyA": {
    "value": 1,
    "writable": true,
    "enumerable": true,
    "configurable": true
  }
})
```
*object*  
```
{
  propertyA: 1
}
```
### `recursiveDefineProperties` Example 2
```
const objectPropertyDescriptorAST = recursiveDefineProperties({}, {
  "propertyA": {
    "value": "1",
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "type": "number"
  }
}, { typeCoercion: true })
```
*object*  
```
{
  propertyA: 1
}
```

### `recursiveDefineProperties` Example 3
```
const object = recursiveDefineProperties({}, {
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
})
```
*object*  
```
{
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
```


### `recursiveDefineProperties` Example 4
```
const objectAST = recursiveDefineProperties({}, {
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
}, { type: true })
```
*object*  
```
{
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
```
