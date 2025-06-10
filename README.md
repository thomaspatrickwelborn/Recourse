# ➲&ensp;Recourse
 - Recursive coutility & convenience methods/properties.  
 - Recursively access & mutate properties for *targeted* or *bound* objects/arrays.  

**Used By**  
&emsp;⁘&emsp;[Core-Plex](https://npmjs.org/core-plex)  
&emsp;❂&emsp;[Objecture](https://npmjs.org/objecture)  
&emsp;⁜&emsp;[MVC Framework](https://npmjs.org/mvc-framework)  

## Methods
 - Pand Methods
   - [`expand`](./document/methods/expand.md)
   - [`impand`](./document/methods/impand.md)
   - [`compand`](./document/methods/compand.md)
   - [`decompand`](./document/methods/decompand.md)
 - Mutator Methods
   - [`assign`](./documents/methods/assign.md)
   - [`assignConcat`](./documents/methods/assign-concat.md)
   - [`defineProperties`](./document/methods/define-properties.md)
   - `defineProperty` Method
   - [`set`](./document/methods/set.md) 
   - [`delete`](./document/methods/delete.md) 
   - [`freeze`](./document/methods/freeze.md)
   - [`seal`](./document/methods/seal.md)
 - Accessor Methods
   - [`get`](./document/methods/get.md) 
   - [`getOwnPropertyDescriptors`](./document/methods/get-own-property-descriptors.md)
   - `getOwnPropertyDescriptor` Method
 - Utitlity Methods
   - [`isArrayLike`](./document/methods/is-array-like.md)
   - [`typedObjectLiteral`](./document/methods/typed-object-literal.md)
   - [`typeOf`](./document/methods/type-of.md)
   - `valueOf`
   - `toString`

## Illustrations
**Import Recourse**  
```
import { Recourse } from 'recourse'
```
**Then With Some Object**  
```
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [3, 33, 333]
    }
  }, {
    propertyD: {
      propertyE: [5, 55, 555]
    }
  }, {
    propertyF: {
      propertyG: [7, 77, 777]
    }
  }]
}
```
**Get/Set/Delete Targeted Accessors/Mutators**  
```
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0')
Recourse.set(object, 'propertyA.1.propertyD.propertyE.1', "55")
Recourse.delete(object, 'propertyA.2.propertyD.propertyE.2')
```

**Get/Set/Delete Bound Accessors/Mutators**  
```
const recourseObject = new Recourse(object)
recourseObject.get('propertyA.0.propertyB.propertyC.0')
recourseObject.set('propertyA.1.propertyD.propertyE.1', "55")
recourseObject.delete('propertyA.2.propertyD.propertyE.2')
```
