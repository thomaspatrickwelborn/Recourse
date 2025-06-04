| [➲ Recourse](../../README.md) | *`typeOf`* |
| :-- | :-- |

# `typeOf` Method
Returns type of some given `$operand`.  
 - [`typeOf` Method Syntax](#typeof-method-syntax)
 - [`typeOf` Examples](#typeof-examples)

## `typeOf` Method Syntax
```
typeOf($operand)
```
### `$operand` Argument
**Type**: `object`, `array`, `map`, `set`, `date`, `regexp`, `promise`, `arraybuffer`, `number`, `function`, `string`, `boolean`, `bigint`, `null`, `undefined`  
**Required**: `true`  
**Descript**: Some value to derive data type from.  

### `return` Value
**Type**: `string`
**Descript**  Returns`$operand`'s prototype string name slice.

## `typeOf` Examples
### `typeOf` Example 1

```
import { typeOf } from 'recourse'

typeOf(new Object())
typeOf(new Array())
typeOf(new Map())
typeOf(new Set())
typeOf(new Date())
typeOf(new RegExp())
typeOf(new Promise(() => {}))
typeOf(new ArrayBuffer())
typeOf(new Function())
typeOf(Number())
typeOf(String())
typeOf(Number())
typeOf(BigInt())
typeOf(null)
typeOf(undefined)
```
*typeOf*  
```
"object"
"array"
"map"
"set"
"date"
"regexp"
"promise"
"arraybuffer"
"function"
"number"
"string"
"number"
"bigint"
"null"
"undefined"
```