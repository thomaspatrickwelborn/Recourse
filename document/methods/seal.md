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

```
import * as Recourse from '/dependencies/recourse.js'
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [3, 33, 333]
    }
  }]
}
Recourse.seal(object)
try { object.propertyD = 4 } catch($err) { console.error($err) }
try { object.propertyA[1] = {
  propertyD: {
    propertyE: [5, 55, 555]
  }
} } catch($err) {
  console.error($err)
}
```

### `seal` Example 2
```
import * as Recourse from '/dependencies/recourse.js'
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [3, 33, 333]
    }
  }],
  propertyD: new Map(Object.entries({
    propertyE: new Map([[0, 5], [1, 55], [2, 555]])
  }))
}
Recourse.seal(object)
try {
  object.propertyD.get('propertyE').set(0, "5")
  object.propertyD.get('propertyE').set(1, "55")
  object.propertyD.get('propertyE').set(2, "555")
} catch($err) { console.error($err) }
```

### `seal` Example 3
```
import { Recourse } from 'recourse'

const recourse = new Recourse({ a: { b: 1 } })

recourse.seal({ objects: true, primitives: false })

Object.isSealed(recourse.target) === true // pass true
Object.isSealed(recourse.target.a) === true // pass true
```

### `seal` Example 4
```
import { Recourse } from 'recourse'

const cyclic = { self: null }
cyclic.self = cyclic

Recourse.seal(cyclic)

Object.isSealed(cyclic) === true // pass true
Object.isSealed(cyclic.self) === true // pass true
```
