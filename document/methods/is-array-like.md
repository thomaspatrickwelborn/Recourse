| [➲ Recourse](../../README.md) | *`isArrayLike`* |
| :-- | :-- |

# `isArrayLike` Method
Returns type of some ``
 - [`isArrayLike` Method Syntax](#isarraylike-method-syntax)
 - [`isArrayLike` Examples](#isarraylike-examples)

## `isArrayLike` Method Syntax
```
isArrayLike($source, $options)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: 

### `$options` Argument
```
{
  strict: true
}
```
#### `strict` Option 
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
When `$options.strict` is: 
 - `true` then `isArrayLike` is also `true` when `$source.length` is a positive integer *and* `$source[$source.length - 1]` is a defined property, otherwise is `false`;
 - `false` then `isArrayLike` is `true` when `$source.length` is an integer `$source.length >= 0`, otherwise is `false`. 
### `return` Value
**Type**: `string`
**Descript**  Returns`$operand`'s prototype string name slice.

## `isArrayLike` Examples
### `isArrayLike` Example 1
```
const arrayLikeObject00 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "length": { value: 4 }
}) // true
const arrayLikeObject01 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "length": { value: 4 }
}) // true
const arrayLikeObject02 = Object.defineProperties({}, {
  "4": { value: 5 },
  "5": { value: 6 },
  "6": { value: 7 },
  "7": { value: 8 },
  "length": { value: 4 }
}) // false
const arrayLikeObject03 = Object.defineProperties({}, {
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "4": { enumerable: true, value: 5 },
  "5": { enumerable: true, value: 6 },
  "length": { value: 4 }
}) // true
const arrayLikeObject04 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "length": { value: 8 }
}) // false
const arrayLikeObject05 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
}) // false
const arrayLikeObject06 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "length": { value: -4 }
}) // false
const arrayLikeObject07 = Object.defineProperties({}, {
  "-0": { enumerable: true, value: 1 },
  "-1": { enumerable: true, value: 2 },
  "-2": { enumerable: true, value: 3 },
  "-3": { enumerable: true, value: 4 },
  "length": { value: 4 }
}) // false
const arrayLikeObject08 = Object.defineProperties({}, {
  "length": { value: 0 }
}) // false
const arrayLikeObject09 = Object.defineProperties({}, {
  "length": { value: 4 }
}) // false
const arrayLikeObject10 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "length": 4,
  "someFunction": () => {},
  "someNumber": 33,
} // true
const arrayLikeObject11 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "length": "4",
} // false
```
*isArrayLike*  
```
isArrayLike(arrayLikeObject00) true
isArrayLike(arrayLikeObject01) true
isArrayLike(arrayLikeObject02) false
isArrayLike(arrayLikeObject03) true
isArrayLike(arrayLikeObject04) false
isArrayLike(arrayLikeObject05) false
isArrayLike(arrayLikeObject06) false
isArrayLike(arrayLikeObject07) false
isArrayLike(arrayLikeObject08) false
isArrayLike(arrayLikeObject09) false
isArrayLike(arrayLikeObject10) true
isArrayLike(arrayLikeObject11) false
```

### `isArrayLike` Example 2
```
const arrayLikeObject00 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "length": { value: 4 }
}) // true
const arrayLikeObject01 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "length": { value: 4 }
}) // true
const arrayLikeObject02 = Object.defineProperties({}, {
  "4": { value: 5 },
  "5": { value: 6 },
  "6": { value: 7 },
  "7": { value: 8 },
  "length": { value: 4 }
}) // true
const arrayLikeObject03 = Object.defineProperties({}, {
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "4": { enumerable: true, value: 5 },
  "5": { enumerable: true, value: 6 },
  "length": { value: 4 }
}) // true
const arrayLikeObject04 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "length": { value: 8 }
}) // true
const arrayLikeObject05 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
}) // false
const arrayLikeObject06 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "length": { value: -4 }
}) // false
const arrayLikeObject07 = Object.defineProperties({}, {
  "-0": { enumerable: true, value: 1 },
  "-1": { enumerable: true, value: 2 },
  "-2": { enumerable: true, value: 3 },
  "-3": { enumerable: true, value: 4 },
  "length": { value: 4 }
}) // true
const arrayLikeObject08 = Object.defineProperties({}, {
  "length": { value: 0 }
}) // true
const arrayLikeObject09 = Object.defineProperties({}, {
  "length": { value: 4 }
}) // true
const arrayLikeObject10 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "length": 4,
  "someFunction": () => {},
  "someNumber": 33,
} // true
const arrayLikeObject11 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "length": "4",
} // false

```
*isArrayLike*  
```
arrayLikeObject00 true
arrayLikeObject01 true
arrayLikeObject02 true
arrayLikeObject03 true
arrayLikeObject04 true
arrayLikeObject05 false
arrayLikeObject06 false
arrayLikeObject07 true
arrayLikeObject08 true
arrayLikeObject09 true
arrayLikeObject10 true
arrayLikeObject11 false
```