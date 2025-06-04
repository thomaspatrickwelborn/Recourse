# ➲&ensp;Recourse
**Used By**  
&emsp;⁘&emsp;[Core-Plex](https://npmjs.org/core-plex)  
&emsp;❂&emsp;[Objecture](https://npmjs.org/objecture)  
&emsp;⁜&emsp;[MVC Framework](https://npmjs.org/mvc-framework)  

Recursive coutility methods, convenience methods/properties.  

## Methods

 - [`expand` Method](./document/methods/expand.md)
 - [`impand` Method](./document/methods/impand.md)
 - [`compand` Method](./document/methods/compand.md)
 - [`decompand` Method](./document/methods/decompand.md)

 - [`assign` Method](./documents/methods/assign.md)
 - [`assignConcat` Method](./documents/methods/assign-concat.md)
 - [`defineProperties` Method](./document/methods/define-properties.md)
 - [`defineProperty` Method]()
 - [`set` Method](./document/methods/set.md) 
 - [`delete` Method](./document/methods/delete.md) 

 - [`get` Method](./document/methods/get.md) 
 - [`getOwnPropertyDescriptors` Method](./document/methods/get-own-property-descriptors.md)
 - `getOwnPropertyDescriptor` Method

 - [`freeze` Method](./document/methods/freeze.md)
 - [`seal` Method](./document/methods/seal.md)

 - [`isArrayLike` Method](./document/methods/is-array-like.md)
 - [`typedObjectLiteral` Method](./document/methods/typed-object-literal.md)
 - [`typeOf` Method](./document/methods/type-of.md)

 ## Illustrations
 ```
 import { Recourse } from 'recourse'
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
