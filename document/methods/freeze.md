| [➲ Recourse](../../README.md) | *`freeze`* |
| :-- | :-- |

# `freeze` Method
Evokes `Object.freeze` with some `$target` object. 
 - [`freeze` Method Syntax](#freeze-method-syntax)
 - [`freeze` Examples](#freeze-examples)

## `freeze` Method Syntax
```
freeze($target, $options)
```
### `$target` Argument
**Type**: `object`, `array`, `map`, `set`, `date`, `regexp`, `promise`, `arraybuffer`, `number`, `function`, `string`, `boolean`, `bigint`, `null`, `undefined`  
**Required**: `true`  
**Default**: `undefined`  
### `$options` Argument
```
{
  objects: true,
  primitives: true, 
}
```
#### `objects` Option
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
When `objects` is: 
 - `true` then `$target` and `$target` property values with `array`/`object` types are frozen.  
 - `false` then `$target` and `$target` property values with `array`/`object` types are **not** frozen.  
#### `primitives` Option 
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
When `primitives` is: 
 - `true` then `$target` and `$target` property values with primitive types are frozen.  
 - `false` then `$target` and `$target` property values with primitive types are **not** frozen.  
## `freeze` Examples
### `freeze` Example 1
