| [➲ Recourse](../../README.md) | *`isMapLike`* |
| :-- | :-- |

# `isMapLike` Method
Returns type of some ``
 - [`isMapLike` Method Syntax](#isarraylike-method-syntax)
 - [`isMapLike` Examples](#isarraylike-examples)

## `isMapLike` Method Syntax
```
isMapLike($source, $options)
```
### `$source` Argument
**Type**: `object`, `array`, `map`  
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
 - `true` then `isMapLike` is also `true` when `$source.size` is a positive integer *and* `$source[$source.size - 1]` is a defined property, otherwise is `false`;
 - `false` then `isMapLike` is `true` when `$source.size` is an integer `$source.size >= 0`, otherwise is `false`. 
### `return` Value
**Type**: `string`
**Descript**  Returns`$operand`'s prototype string name slice.

## `isMapLike` Examples
### `isMapLike` Example 1
```
map00 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "size": { value: 4 }
}) // true
const mapLikeObject01 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "size": { value: 4 }
}) // true
const mapLikeObject02 = Object.defineProperties({}, {
  "4": { value: 5 },
  "5": { value: 6 },
  "6": { value: 7 },
  "7": { value: 8 },
  "size": { value: 4 }
}) // false
const mapLikeObject03 = Object.defineProperties({}, {
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "4": { enumerable: true, value: 5 },
  "5": { enumerable: true, value: 6 },
  "size": { value: 4 }
}) // true
const mapLikeObject04 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "size": { value: 8 }
}) // false
const mapLikeObject05 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
}) // false
const mapLikeObject06 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "size": { value: -4 }
}) // false
const mapLikeObject07 = Object.defineProperties({}, {
  "-0": { enumerable: true, value: 1 },
  "-1": { enumerable: true, value: 2 },
  "-2": { enumerable: true, value: 3 },
  "-3": { enumerable: true, value: 4 },
  "size": { value: 4 }
}) // false
const mapLikeObject08 = Object.defineProperties({}, {
  "size": { value: 0 }
}) // false
const mapLikeObject09 = Object.defineProperties({}, {
  "size": { value: 4 }
}) // false
const mapLikeObject10 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "size": 4,
  "someFunction": () => {},
  "someNumber": 33,
} // true
const mapLikeObject11 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "size": "4",
} // false
```
*isMapLike*  
```
isMapLike(mapLikeObject00) true
isMapLike(mapLikeObject01) true
isMapLike(mapLikeObject02) false
isMapLike(mapLikeObject03) true
isMapLike(mapLikeObject04) false
isMapLike(mapLikeObject05) false
isMapLike(mapLikeObject06) false
isMapLike(mapLikeObject07) false
isMapLike(mapLikeObject08) false
isMapLike(mapLikeObject09) false
isMapLike(mapLikeObject10) true
isMapLike(mapLikeObject11) false
```

### `isMapLike` Example 2
```
const mapLikeObject00 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "size": { value: 4 }
}) // true
const mapLikeObject01 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "size": { value: 4 }
}) // true
const mapLikeObject02 = Object.defineProperties({}, {
  "4": { value: 5 },
  "5": { value: 6 },
  "6": { value: 7 },
  "7": { value: 8 },
  "size": { value: 4 }
}) // true
const mapLikeObject03 = Object.defineProperties({}, {
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
  "4": { enumerable: true, value: 5 },
  "5": { enumerable: true, value: 6 },
  "size": { value: 4 }
}) // true
const mapLikeObject04 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "size": { value: 8 }
}) // true
const mapLikeObject05 = Object.defineProperties({}, {
  "0": { enumerable: true, value: 1 },
  "1": { enumerable: true, value: 2 },
  "2": { enumerable: true, value: 3 },
  "3": { enumerable: true, value: 4 },
}) // false
const mapLikeObject06 = Object.defineProperties({}, {
  "0": { value: 1 },
  "1": { value: 2 },
  "2": { value: 3 },
  "3": { value: 4 },
  "size": { value: -4 }
}) // false
const mapLikeObject07 = Object.defineProperties({}, {
  "-0": { enumerable: true, value: 1 },
  "-1": { enumerable: true, value: 2 },
  "-2": { enumerable: true, value: 3 },
  "-3": { enumerable: true, value: 4 },
  "size": { value: 4 }
}) // true
const mapLikeObject08 = Object.defineProperties({}, {
  "size": { value: 0 }
}) // true
const mapLikeObject09 = Object.defineProperties({}, {
  "size": { value: 4 }
}) // true
const mapLikeObject10 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "size": 4,
  "someFunction": () => {},
  "someNumber": 33,
} // true
const mapLikeObject11 = {
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "size": "4",
} // false

```
*isMapLike*  
```
mapLikeObject00 true
mapLikeObject01 true
mapLikeObject02 true
mapLikeObject03 true
mapLikeObject04 true
mapLikeObject05 false
mapLikeObject06 false
mapLikeObject07 true
mapLikeObject08 true
mapLikeObject09 true
mapLikeObject10 true
mapLikeObject11 false
```