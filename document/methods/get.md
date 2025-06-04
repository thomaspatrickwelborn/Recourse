| [➲ Recourse](../../README.md) | *`get`* |
| :-- | :-- |

# `get` Method
...  
 - [`get` Method Syntax](#get-method-syntax)
 - [`get` Examples](#get-examples)

## `get` Method Syntax
```
Recourse.get($target, $path)
```
### `$target` Argument
**Type**: `array`, `object`  
**Required**: `true`  
**Descript**: Object/Array from which to derive property value when `$path` is defined, otherwise returns $target.  

### `$path` Argument
**Type**: `string`  
**Required**: `false`  
**Descript**: Dot-notation path to property value on `$target`.  

### `return` Value
**Type**: `any`  
**Descript**: Property value located on `$target` at `$path`.    

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
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2')
```
*get*  
```
555
```