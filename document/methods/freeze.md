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
**Type**: `object`, `array`  
**Required**: `true`  
**Default**: `undefined`  
### `$options` Argument
```
{}
```

### `freeze` Example 1

```
import { Recourse } from 'recourse'

const object = {
  propertyA: {
    propertyB: {
      propertyC: 42
    }
  },
  array: [ { value: 100 } ]
}

Recourse.freeze(object)

Object.isFrozen(object) === true // pass true
Object.isFrozen(object.propertyA) === true // pass true
Object.isFrozen(object.propertyA.propertyB) === true // pass true
Object.isFrozen(object.array[0]) === true // pass true

// Attempt mutation (should fail silently)
object.propertyA.propertyB.propertyC = 99
object.propertyA.propertyB.propertyC === 42 // pass true
JavaScript
```

### `freeze` Example 2
```
import { Recourse } from 'recourse'

const map = new Map([
  ['keyA', { nested: 123 }]
])

Recourse.freeze(map)

Object.isFrozen(map) === true // pass true
Object.isFrozen(map.get('keyA')) === true // pass true

map.get('keyA').nested = 456
map.get('keyA').nested === 123 // pass true
```

### `freeze` Example 3
```
import { Recourse } from 'recourse'

const recourse = new Recourse({ a: { b: 1 } })

recourse.freeze()

Object.isFrozen(recourse.target) === true // pass true
Object.isFrozen(recourse.target.a) === true // pass true
```


### `freeze` Example 4
```
// Cycle handling example
import { Recourse } from 'recourse'

const cyclic = { self: null }
cyclic.self = cyclic

Recourse.freeze(cyclic) // should not infinite loop

Object.isFrozen(cyclic) === true // pass true
Object.isFrozen(cyclic.self) === true // pass true
```