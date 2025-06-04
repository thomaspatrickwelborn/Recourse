| [➲ Recourse](../../README.md) | *`delete`* |
| :-- | :-- |

# `delete` Method
...  
 - [`delete` Method Syntax](#delete-method-syntax)
 - [`delete` Examples](#delete-examples)

## `delete` Method Syntax
```
Recourse.delete($target, $path)
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

## `delete` Examples
### `delete` Example 1
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
Recourse.delete(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2')
Recourse.delete(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1')
Recourse.delete(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0')
```
*delete*  
```
undefined
undefined
undefined
```