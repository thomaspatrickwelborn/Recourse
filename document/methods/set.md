| [➲ Recourse](../../README.md) | *`set`* |
| :-- | :-- |

# `set` Method
...  
 - [`set` Method Syntax](#set-method-syntax)
 - [`set` Examples](#set-examples)

## `set` Method Syntax
```
Recourse.set($target, $path)
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

## `set` Examples
### `set` Example 1
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
Recourse.set(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2', "555")
Recourse.set(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1', "55")
Recourse.set(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0', "5")
```
*set*  
```
"555"
"55"
"5"
```