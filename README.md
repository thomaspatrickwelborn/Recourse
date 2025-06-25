# ➲&ensp;Recourse
 - Recursive coutility & convenience methods/properties.  
 - Recursively access & mutate properties for *targeted* or *bound* objects/arrays/maps.  

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
 - Actensor Methods
   - [`get`](./document/methods/get.md) 
   - [`getOwnPropertyDescriptors`](./document/methods/get-own-property-descriptors.md)
   - `getOwnPropertyDescriptor` Method
 - Utitlity Methods
   - [`isArrayLike`](./document/methods/is-array-like.md)
   - [`isMapLike`](./document/methods/is-map-like.md)
   - [`typeOf`](./document/methods/type-of.md)
   - [`valueOf`](./document/methods/value-of.md)
   - [`toString`](./document/methods/to-string.md)

## Illustrations
**Import Recourse**  
```
import { Recourse } from 'recourse'
```
**Then With Some Object/Array/Map**  
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
      propertyG: new Map([[0, 7], [1, 77], [2, 777]])
    }
  }]
}
```
**`get`/`set`/`delete` Targeted Tensors/Mutators**  
```
Recourse.get(object, 'propertyA.0.propertyB.propertyC.0')
Recourse.set(object, 'propertyA.1.propertyD.propertyE.1', "55")
Recourse.delete(object, 'propertyA.2.propertyF.propertyG.2')
```
*get*/*set*/*delete*  
```
propertyA.0.propertyB.propertyC.0 3
propertyA.1.propertyD.propertyE.1 "55"
propertyA.2.propertyF.propertyG.2 undefined
```

**`get`/`set`/`delete` Bound Tensors/Mutators**  
```
const recourseObject = new Recourse(object)
recourseObject.get('propertyA.0.propertyB.propertyC.2')
recourseObject.set('propertyA.1.propertyD.propertyE.2', "555")
recourseObject.delete('propertyA.2.propertyF.propertyG.2')
```
*get*/*set*/*delete*  
```
propertyA.0.propertyB.propertyC.2 333
propertyA.1.propertyD.propertyE.2 555
propertyA.2.propertyF.propertyG.2 undefined
```

