| [➲ Recourse](../../README.md) | *`seal`* |
| :-- | :-- |

# `seal` Method
Evokes `Object.seal` with some `$target` object. 
 - [`seal` Method Syntax](#seal-method-syntax)
 - [`seal` Examples](#seal-examples)

## `seal` Method Syntax
```
seal($target, $options)
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
 - `true` then `$target` and `$target` property values with `array`/`object` types are sealed.  
 - `false` then `$target` and `$target` property values with `array`/`object` types are **not** sealed.  
#### `primitives` Option 
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
When `primitives` is: 
 - `true` then `$target` and `$target` property values with primitive types are sealed.  
 - `false` then `$target` and `$target` property values with primitive types are **not** sealed.  
## `seal` Examples
### `seal` Example 1
