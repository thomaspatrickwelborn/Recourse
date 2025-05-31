| [➲ Recourse](../../README.md) | *`defineProperties`* |
| :-- | :-- |

# `defineProperties`
Returns object/array property descriptor abstract syntax tree (PDAST).  

## Syntax
```
import { defineProperties } from 'recourse'
defineProperties($target, $propertyDescriptors, $options)
```
### `$target` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Property definition target.  
### `$propertyDescriptors` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Property descriptors with extra detail.  
```
{
  [$propertyDescriptor]: {
    configurable: false,
    enumerable: false,
    frozen: false,
    sealed: false,
    writable: false,
  }
}
```
#### `$propertyDescriptor.configurable`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: [$propertyDescriptor.configurable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#configurable)
#### `$propertyDescriptor.enumerable`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: [$propertyDescriptor.enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#enumerable)
#### `$propertyDescriptor.frozen`
**Type**: `boolean`  
**Default**: `false`  
#### `$propertyDescriptor.sealed`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: Properties defined with sealed.  
#### `$propertyDescriptor.writable`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: [$propertyDescriptor.writable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#writable)

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

## `defineProperties` Examples
### `defineProperties` Example 1
```
const object = defineProperties({}, {
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
### `defineProperties` Example 2
```
const objectPropertyDescriptorAST = defineProperties({}, {
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

### `defineProperties` Example 3
```
const object = defineProperties({}, {
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


### `defineProperties` Example 4
```
const object = {
  propertyA: {
    propertyB: 2,
  }
}
const objectString = JSON.stringify(object, null, 2)
object.propertyA.propertyC = object.propertyA
object.propertyD = object
const objectPDAST = getOwnPropertyDescriptors(object, {
  path: true,
  type: true,
})
object.propertyA.propertyB = String(object.propertyA.propertyB)
const objectDefinedProperties = defineProperties({}, objectPDAST, {
  typeCoercion: true, 
})
```
*objectPDAST*  
```
{
  "propertyA": {
    "value": {
      "propertyB": {
        "value": "2",
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyB",
        "type": "number"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "object"
  }
}
```
*object*  
```
{
  "propertyA": {
    "propertyB": 2
  }
}
```
