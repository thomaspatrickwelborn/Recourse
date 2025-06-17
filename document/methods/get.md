| [➲ Recourse](../../README.md) | *`get`* |
| :-- | :-- |

# `get` Method
`get` method returns either a single property value from a path or all property values from a `$receiver` or `$target` object. By default:  
 - when property is accessed from `array` or `object` `$receiver` and `$target` are same; 
 - when property is accessed from `map` then `$receiver` is `map` and `$target` is array of object entries from map entries. 

Optionally specify if `$target` or `$receiver` is returned from invocation.  
 - [`get` Method Syntax](#get-method-syntax)
 - [`get` Examples](#get-examples)

## `get` Method Syntax
**Get all property values**  
```
Recourse.get($receiver)
Recourse.get($receiver, $options)
```
**Get single property value**  
```
Recourse.get($receiver, $path)
Recourse.get($receiver, $path, $options)
```
### `$receiver` Argument
**Type**: `array`, `object`, `map`  
**Required**: `true`  
**Descript**: Object/Array from which to derive property value when `$path` is defined. 

### `$path` Argument
**Type**: `string`  
**Required**: `false`  
**Descript**: Dot-notation path to property value on `$target`.  

### `$options` Argument
#### `getters` Option
**Type**: `array[tensor]`  
**Default**: `[Getters.Object, Getters.Map]`
**Descript**:  
Array of `Tensor` methods that return properties from a receiver.  

#### `returnTarget` Option
**Type**: `boolean`  
**Default**: `false`  
**Descript**:  
When `$returnTarget` is: 
 - `false` - Returns `$receiver` wrapping `$target`.  
 - `true` - Returns direct `$target` from `$receiver`.  

### `return` Value
**Type**: `any`  
**Descript**: Property value located on either `$target` at `$path`.    

## `get` Examples
### `get` Example 1
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
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0')
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1')
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2')
```
*get*
```
5
55
555
```

### `get` Example 2
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
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0')
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1')
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2')
```
*get*
```
5
55
555
```

### `get` Example 3
```
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: new Map([[0, 5], [1, 55], [2, 555]])
        }
      }]
    }
  }]
}
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0')
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1')
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2')
```
*get*
```
5
55
555
```