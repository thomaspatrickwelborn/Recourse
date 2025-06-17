| [➲ Recourse](../../README.md) | *`set`* |
| :-- | :-- |

# `set` Method
`set` method assigns either a single property value to a path or all property values to a `$receiver` or `$target` object. Optionally specify if `$target` or `$receiver` is returned from invocation. 
...  
 - [`set` Method Syntax](#set-method-syntax)
 - [`set` Examples](#set-examples)

## `set` Method Syntax
```
Recourse.set($receiver, $value)
Recourse.set($receiver, $path, $value)
```
### `$receiver` Argument
**Type**: `array`, `object`  
**Required**: `true`  
**Descript**: Object/Array/Map from which to derive property value when `$path` is defined. 

### `$path` Argument
**Type**: `string`  
**Required**: `false`  
**Descript**: Dot-notation path to property value on `$receiver`.  

### `$value` Argument
**Type**: `any`  
**Required**: `true`  
**Descript**: Property value to assign at dot-notation path.  

### `return` Value
**Type**: `any`  
**Descript**:
When `$path` provided, Property value located on `$receiver` at `$path`.    

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

## `set` Examples
### `set` Example 2
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
Recourse.set(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.2', "555", options)
Recourse.set(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.1', "55", options)
Recourse.set(object, 'propertyA.0.propertyB.propertyC.0.propertyD.propertyE.0', "5", options)
```
*set*  
```
"555"
"55"
"5"
```


## `set` Examples
### `set` Example 3
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

